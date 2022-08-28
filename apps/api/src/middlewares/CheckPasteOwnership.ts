import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";

function assertPasteOwnership(req: FullRequest, res: Response, next: () => void) {
    if (req.additional.user != req.additional.pasteData.owner_id) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }

    next();
}

function assertPasteOwnershipPrivate(req: FullRequest, res: Response, next: () => void) {
    if (req.additional.pasteData.is_private && req.additional.pasteData.owner_id != req.additional.user) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }

    next();
}

export {
    assertPasteOwnership,
    assertPasteOwnershipPrivate
};