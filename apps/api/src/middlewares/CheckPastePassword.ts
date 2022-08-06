import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
import { ServerResponse } from "../utils/ServerResponse";
import bcrypt from "bcrypt";

async function checkPassword(req: FullRequest, res: Response, next: () => void) {
    if (req.additional.pasteData.password) {
        if (req.additional.password === undefined) {
            res.status(401).send(ServerResponse(false, "No password provided"));
            return;
        }

        const match = await bcrypt.compare(req.additional.password, req.additional.pasteData.password);

        if (match) {
            next();
            return;
        }

        res.status(401).send(ServerResponse(false, "Incorrect password"));
        return;
    }

    next();
}

export {
    checkPassword
};