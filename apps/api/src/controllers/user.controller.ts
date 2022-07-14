import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import * as db from "../services/db.service";
import { PasteData, UserData } from "interfaces";
import { DbPaste } from "../models/DbPaste.interface";

async function getUserInfo(req: FullRequest, res: Response) {
    const userId = req.additional.user;

    try {
        const dbData = await db.query("SELECT * FROM users WHERE users.id = $1", [userId]);

        if (dbData.rowCount < 1) {
            res.status(400).send(ServerResponse(false, "Invalod user"));
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
        res.status(500).send(DefaultResponses.SERVER_ERROR);
    }
}

async function getUserPastes(req: FullRequest, res: Response) {
    const userId = req.additional.user;

    try {
        const dbData = await db.query("SELECT * FROM pastes WHERE pastes.owner_id = $1 ORDER BY pastes.created DESC", [userId]);
        const userData = (await db.query("SELECT username, id FROM users WHERE users.id = $1", [userId])).rows[0];


        const pastes = dbData.rows.map((f: DbPaste) => ({
            title: f.title,
            isPrivate: f.is_private,
            password: f.password != null,
            created: f.created,
            owner: userData,
            uuid: f.uuid
        }));

        res.send(ServerResponse(true, pastes));
    } catch (err) {
        console.log(err);
        res.status(500).send(DefaultResponses.SERVER_ERROR);
    }
}



export {
    getUserInfo,
    getUserPastes
};