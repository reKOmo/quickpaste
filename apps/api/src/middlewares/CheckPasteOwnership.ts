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

export {
    assertPasteOwnership
};