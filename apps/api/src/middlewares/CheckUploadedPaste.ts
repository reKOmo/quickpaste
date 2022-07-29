import { Response } from "express";
import Joi from "joi";
import { FullRequest } from "../models/FullRequest.interface";
import { ServerResponse } from "../utils/ServerResponse";

const userPasteFragment = Joi.object({
    name: Joi.string()
        .max(50)
        .required(),
    syntax: Joi.string().default("text").required(),
    content: Joi.string().required()
});

const userPaste = Joi.object({
    title: Joi.string()
        .min(1)
        .max(50)
        .required(),
    fragments: Joi.array()
        .min(1)
        .items(userPasteFragment)
        .sparse(false)
        .required(),
    password: Joi.string()
        .min(1),
    isPrivate: Joi.boolean()
        .default(false)
});

export async function checkUploadPaste(req: FullRequest, res: Response, next: () => void) {
    const validPaste = userPaste.validate(req.body);

    if (validPaste.error) {
        res.status(400).send(ServerResponse(false, validPaste.error.details[0].message));
        return;
    }

    if (req.additional.user === 0) {
        if (validPaste.value.isPrivate != false) {
            res.status(400).send(ServerResponse(false, "Private pastes are only for logged in users"));
            return;
        }
    }

    req.additional["uploadedPaste"] = validPaste.value;

    next();
}