import { Request, Response } from "express";
import { deleteFile, deleteFiles, retriveFile, uploadFile } from "../services/s3.service";
import { Paste, PasteFragment, PasteUpload } from "interfaces";
import generateUUID from "../utils/GenerateUUID";
import * as db from "../services/db.service";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import { FullRequest } from "../models/FullRequest.interface";
import { Constants } from "../config/constants";
import bcrypt from "bcrypt";
import { AES, enc } from "crypto-js";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { streamToString } from "../utils/StreamToString";


async function savePasteToS3(paste: PasteUpload, uuid: string) {
    const saveReadyPaste = {
        title: paste.title,
        fragments: paste.fragments
    };

    let pasteString = JSON.stringify(saveReadyPaste);

    if (paste["unhashedPassword"] !== undefined) {
        pasteString = AES.encrypt(pasteString, paste["unhashedPassword"]).toString();
    }

    await uploadFile(uuid, pasteString);
}

async function uploadPaste(req: FullRequest, res: Response) {
    const paste = req.additional.uploadedPaste;
    const client = await db.getClient();
    let uuid = generateUUID(Constants.PASTE_UUID_LENGTH);

    if (paste.password !== undefined) {
        paste["unhashedPassword"] = paste.password;

        const saltRounds = 10;
        const psswd = await bcrypt.hash(paste.password, saltRounds);

        paste.password = psswd;
    }

    await client.query("BEGIN;");

    try {
        //try to get uuid
        for (let retries = 0; retries < 10; retries++) {
            try {
                await client.query("INSERT INTO pastes (uuid, owner_id, password, is_private, title) VALUES ($1::character varying, $2::integer, $3::character varying, $4::boolean, $5::character varying) returning id;", 
                    [uuid, req.additional.user.toString(), paste.password, paste.isPrivate.toString(), paste.title]);
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

        await client.query("INSERT INTO content_modification (api_key) VALUES ($1::character varying)", [req.additional.apiKey]);

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
    let s3Ret: GetObjectCommandOutput;
    try {
        s3Ret = await retriveFile(req.additional.pasteUUID);
    } catch (err) {
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
        return;
    }

    
    let body = await streamToString(s3Ret.Body as NodeJS.ReadableStream);

    if (req.additional.pasteData.password) {
        const bytes = AES.decrypt(body, req.additional.password);
        body = bytes.toString(enc.Utf8);
    }

    const s3Data: { title: string, fragments: PasteFragment[] } = JSON.parse(body);

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

    if (paste.password !== undefined) {
        paste["unhashedPassword"] = paste.password;

        const saltRounds = 10;
        const psswd = await bcrypt.hash(paste.password, saltRounds);

        paste.password = psswd;
    }

    const client = await db.getClient();

    await client.query("BEGIN;");

    try {
        await client.query("UPDATE pastes SET title = $1::character varying, is_private = $2::boolean, password = $3::character varying WHERE uuid = $4;", 
            [paste.title, paste.isPrivate.toString(), paste.password, uuid]);
        await savePasteToS3(paste, uuid);
        await client.query("INSERT INTO content_modification (api_key) VALUES ($1::character varying)", [req.additional.apiKey]);
        await client.query("COMMIT;");

        res.send(ServerResponse(true, {
            pasteId: uuid,
            message: "Updated paste"
        }));
    } catch (err) {
        await client.query("ROLLBACK;");
        console.error(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
    }
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

async function clearOldPastes(req: Request, res: Response) {
    const client = await db.getClient();

    await client.query("BEGIN;");

    try {
        // get guest pastes
        const oldGuestRes = await client.query("SELECT uuid FROM pastes WHERE last_visited::date <= CURRENT_DATE - interval '1' month AND owner_id = 0;");
        const guestPastesIds = oldGuestRes.rows.map(p => p.uuid);

        // get user pastes
        const oldUserRes = await client.query("SELECT uuid FROM pastes WHERE last_visited::date <= CURRENT_DATE - interval '6' month AND owner_id != 0;");
        const userPastesIds = oldUserRes.rows.map(p => p.uuid);

        const pastesToDelete = guestPastesIds.concat(userPastesIds);

        // delete old pastes
        await client.query("DELETE FROM pastes WHERE uuid = ANY ($1) RETURNING uuid;", [pastesToDelete]);

        //!!!!!!!   TODO
        /*
        Delete form s3
        6e60HnuK
CmqqMGVt
GNyu6PJ6
O1QyXbPD
PjsANha2
SD16hctw
XHex9ddI
Y3QXboGj
ZO1NZjs0
lZGV5pQr
rJICgbGY
swZ8kjTO

        */

        await deleteFiles(pastesToDelete);

        await client.query("COMMIT;");

        res.send("Removed (" + pastesToDelete.length + "): " + JSON.stringify(pastesToDelete));
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
    deletePaste,
    clearOldPastes
};
