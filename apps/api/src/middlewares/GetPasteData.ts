import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
import * as db from "../services/db.service";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";


async function getPasteData(req: FullRequest, res: Response, next: () => void) {
    const pastes = await db.query("SELECT pastes.*, users.username AS owner_username FROM pastes LEFT JOIN users ON users.id = pastes.owner_id WHERE pastes.uuid = $1;", [req.additional.pasteUUID]);
    if (pastes.rowCount < 1) {
        res.status(404).send(ServerResponse(false, DefaultResponses.NOT_FOUND));
        return;
    }

    req.additional["pasteData"] = pastes.rows[0];

    await db.query("UPDATE pastes SET last_visited = NOW() WHERE id = $1;", [pastes.rows[0].id]);

    next();
}

export {
    getPasteData
};