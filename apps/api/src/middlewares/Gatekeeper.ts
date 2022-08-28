import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import qConfig from "quickpaste-constants";

export function gatekeep(req: FullRequest, res: Response, next: () => void) {
    const userId = req.additional.user;

    if (qConfig.PROTECTED_ACCOUNTS.includes(userId)) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }

    next();
}