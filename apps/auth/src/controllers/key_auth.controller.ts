import { Request, Response } from "express";
import { TokenTypes } from "../models/Tokens.interface";
import { authToken, generateGuestKey, generatePermaKey } from "../services/tokens.service";

function getRequestToken(req: Request): string | undefined {
    if (req.headers["authorization"]) {
        return req.headers["authorization"].split(" ")[1];
    }
    // } else if (req.cookies["quickpaste_auth"]) {
    //     return req.cookies["quickpaste_auth"];
    // }

    return undefined;
}

async function auth(req: Request, res: Response) {
    const key = getRequestToken(req);
    if (key == undefined) {
        res.status(401).send({
            ok: false,
            result: "Authorization credientials missing"
        });
        return;
    }

    try {
        const { userId } = await authToken(key);
        res.setHeader("Authorization", userId).end();
    } catch (err) {
        //TODO proper errors
        console.log(err);
        res.status(403).send(err);
        return;
    }

    // res.send(payload);
}

async function generate(req: Request, res: Response) {
    const header = req.headers["authorization"];

    if (header) {
        const tempToken = header.split(" ")[1];
        const { userId, accountType } = await authToken(tempToken);
        if (accountType === TokenTypes.TMP) {
            const permaToken = generatePermaKey(userId);
            res.send({ ok: true, result: permaToken });
        } else {
            res.status(401).end();
        }
    } else {
        const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress;
        const key = generateGuestKey(ip);

        res.send({ ok: true, result: key });
    }
}

export {
    auth,
    generate
};