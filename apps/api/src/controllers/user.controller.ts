import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import * as db from "../services/db.service";
import { UserData } from "interfaces";
import { DbPaste } from "../models/DbPaste.interface";
import { deleteFile } from "../services/s3.service";
import Joi from "joi";

const getPasteParams = Joi.object({
    amount: Joi.number().min(1).max(100).default(20),
    // lastPasteID
    pageId: Joi.number().positive().optional()
});


async function getUserInfo(req: FullRequest, res: Response) {
    const userId = req.additional.user;

    console.log(req.additional);

    try {
        const dbData = await db.query("SELECT * FROM users WHERE users.id = $1", [userId]);

        if (dbData.rowCount < 1) {
            res.status(401).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
            return;
        }

        const userData = dbData.rows[0];
        const dataToSend: UserData = {
            id: userData.id,
            username: userData.username,
            joined: userData.joined
        };

        res.send(dataToSend);
    } catch (err) {
        console.log(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
    }
}

async function getUserPastes(req: FullRequest, res: Response) {
    const validParams = getPasteParams.validate(req.query);

    if (validParams.error) {
        res.status(400).send(ServerResponse(false, "Invalid params: " + validParams.error.message));
        return;
    }

    const userId = req.additional.user;

    try {
        const query = "SELECT * FROM pastes WHERE pastes.owner_id = $1" + (validParams.value.pageId !== undefined ? " AND pastes.id < $3 " : " ") + "ORDER BY pastes.created DESC LIMIT $2";
        const params = [userId, validParams.value.amount];
        if (validParams.value.pageId !== undefined) params.push(validParams.value.pageId);
        const userPastes = await db.query(query, params);
        const userData = (await db.query("SELECT username, id FROM users WHERE users.id = $1", [userId])).rows[0];


        const pastes = userPastes.rows.map((f: DbPaste) => ({
            title: f.title,
            isPrivate: f.is_private,
            password: f.password != null,
            created: f.created,
            owner: userData,
            uuid: f.uuid
        }));

        const response = {
            pastes
        };

        if (userPastes.rowCount > 0) {
            response["nextPage"] = userPastes.rows[userPastes.rowCount - 1].id;
        }

        res.send(ServerResponse(true, response));
    } catch (err) {
        console.log(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
    }
}


async function deleteAccount(req: FullRequest, res: Response) {
    const userId = req.additional.user;

    const client = await db.getClient();

    await client.query("BEGIN;");

    try {
        await client.query("DELETE FROM users WHERE users.id = $1;", [userId]);
        const dbRes = await client.query("DELETE FROM pastes WHERE pastes.owner_id = $1 RETURNING pastes.uuid;", [userId]);

        const deletedPastes = dbRes.rows;

        for (let i = 0; i < deletedPastes.length; i++) {
            await deleteFile(deletedPastes[i].uuid);
        }

        await client.query("COMMIT;");
        res.send(ServerResponse(true, "Account deleted"));
    } catch (err) {
        await client.query("ROLLBACK;");
        console.error(err);
        res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
    }

    client.release();
}



export {
    getUserInfo,
    getUserPastes,
    deleteAccount
};