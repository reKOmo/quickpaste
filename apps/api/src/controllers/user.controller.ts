import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import * as db from "../services/db.service";
import { UserData } from "interfaces";

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



export {
    getUserInfo
};