import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";

export function gatekeep(req: FullRequest, res: Response, next: () => void) {
    const userId = req.additional.user;

    if (0 === userId) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }

    next();
}