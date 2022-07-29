import { Response } from "express";
import { deleteFile, retriveFile, uploadFile } from "../services/s3.service";
import { Paste, PasteFragment, PasteUpload } from "interfaces";
import generateUUID from "../utils/GenerateUUID";
import * as db from "../services/db.service";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import { FullRequest } from "../models/FullRequest.interface";
import { GetObjectOutput } from "aws-sdk/clients/s3";
import { Constants } from "../config/constants";


async function savePasteToS3(paste: PasteUpload, uuid: string) {
    const saveReadyPaste = {
        title: paste.title,
        fragments: paste.fragments
    };

    await uploadFile(uuid, JSON.stringify(saveReadyPaste));
}

async function uploadPaste(req: FullRequest, res: Response) {
    const paste = req.additional.uploadedPaste;
    const client = await db.getClient();
    let uuid = generateUUID(Constants.PASTE_UUID_LENGTH);

    await client.query("BEGIN;");

    try {
        //try to get uuid
        for (let retries = 0; retries < 10; retries++) {
            try {
                await client.query("INSERT INTO pastes (uuid, owner_id, password, is_private, title) VALUES ($1::character varying, $2::integer, $3::character varying, $4::boolean, $5::character varying) returning id;",
                    [uuid, req.additional.user, paste.password, paste.isPrivate, paste.title]);
                break;
            } catch (err) {
                if (err.code == 23505) {
                    //Duplicate uuid
                    uuid = generateUUID(Constants.PASTE_UUID_LENGTH);
                } else {
                    client.release();
                    console.error(err);
                    throw Error(err);
                }
            }
        }
        //add frags to storage
        await savePasteToS3(paste, uuid);

        await client.query("COMMIT;");

        res.send(ServerResponse(true, {
            pasteId: uuid
        }));
    } catch (err) {
        await client.query("ROLLBACK;");
        console.error(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
    }

    client.release();
}

async function getPaste(req: FullRequest, res: Response) {
    //check if paste private
    if (req.additional.pasteData.is_private && req.additional.pasteData.owner_id != req.additional.user) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }


    let s3Ret: GetObjectOutput;
    try {
        s3Ret = await retriveFile(req.additional.pasteUUID);
    } catch {
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
        return;
    }

    const s3Data: { title: string, fragments: PasteFragment[] } = JSON.parse(s3Ret.Body.toString());

    const fPaste: Paste = {
        title: s3Data.title,
        fragments: s3Data.fragments,
        isPrivate: req.additional.pasteData.is_private,
        created: req.additional.pasteData.created,
        password: req.additional.pasteData.password != undefined,
        owner: {
            id: req.additional.pasteData.owner_id,
            username: req.additional.pasteData.owner_username
        }
    };

    res.send(fPaste);
}

async function editPaste(req: FullRequest, res: Response) {
    const paste = req.additional.uploadedPaste;
    const uuid = req.additional.pasteUUID;

    try {
        await db.safeQuery("UPDATE pastes SET title = $1::character varying, is_private = $2::boolean WHERE uuid = $3;", [paste.title, paste.isPrivate, uuid]);
        await savePasteToS3(paste, uuid);
    } catch (err) {
        console.error(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
        return;
    }

    res.send(ServerResponse(true, {
        pasteId: uuid,
        message: "Updated paste"
    }));
}

async function deletePaste(req: FullRequest, res: Response) {
    const uuid = req.additional.pasteUUID;

    const client = await db.getClient();

    await client.query("BEGIN;");

    try {
        await client.query("DELETE FROM pastes WHERE uuid = $1;", [uuid]);

        await deleteFile(uuid);

        await client.query("COMMIT;");
        res.send(ServerResponse(true, "Paste deleted"));
    } catch (err) {
        await client.query("ROLLBACK;");
        console.error(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
    }

    client.release();
}

export {
    uploadPaste,
    getPaste,
    editPaste,
    deletePaste
};
