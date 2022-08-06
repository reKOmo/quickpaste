import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
import Joi from "joi";
import { Constants } from "../config/constants";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";

const pasteIdSchema = Joi.string().length(Constants.PASTE_UUID_LENGTH).pattern(new RegExp('([A-Z]|[a-z]|[0-9])*'));


function parseRequest(req: FullRequest, res: Response, next: () => void) {
    const userId = req.headers["x-user"];

    //internal
    if (userId) {
        req.additional["user"] = parseInt(Array.isArray(userId) ? userId[0] : userId);
    } else {
        res.status(400).send("No user id");
        return;
    }


    //external
    const pasteId = req.params.pasteId;

    if (pasteId != undefined) {
        const pasteTest = pasteIdSchema.validate(pasteId);

        if (pasteTest.error) {
            res.status(404).send(ServerResponse(false, DefaultResponses.NOT_FOUND));
            return;
        }

        req.additional["pasteUUID"] = pasteId;
    }

    if (req.headers["paste-authorization"]) {
        req.additional["password"] = Array.isArray(req.headers["paste-authorization"]) ? req.headers["paste-authorization"][0] : req.headers["paste-authorization"];
    }


    next();
}

export {
    parseRequest
};