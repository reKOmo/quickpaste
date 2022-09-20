import { Response } from "express";
import Joi from "joi";
import { FullRequest } from "../models/FullRequest.interface";
import { ServerResponse } from "../utils/ServerResponse";
import qConfig from "quickpaste-constants";

const userPasteFragment = Joi.object({
    name: Joi.string()
        .max(50)
        .required(),
    syntax: Joi.string().allow(...qConfig.SUPPORTED_SYNTAXES).default("text").required(),
    content: Joi.string().required()
});

const userPaste = Joi.object({
    title: Joi.string()
        .min(1)
        .max(50)
        .required(),
    fragments: Joi.array()
        .min(1)
        .max(500)
        .items(userPasteFragment)
        .sparse(false)
        .required(),
    password: Joi.string().allow(""),
    isPrivate: Joi.boolean()
        .default(false)
});

export async function checkUploadPaste(req: FullRequest, res: Response, next: () => void) {
    console.log(req.body);
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
        if (validPaste.value.fragments.length > qConfig.PASTE.FRAGMENT_LIMITS.guest) {
            res.status(400).send(ServerResponse(false, "'fragments' length can not be longer than " + qConfig.PASTE.FRAGMENT_LIMITS.guest));
            return;
        }
    }

    //if password is empty set to undefined
    if (validPaste.value.password?.length == 0) {
        validPaste.value.password = undefined;
    }

    req.additional["uploadedPaste"] = validPaste.value;

    next();
}