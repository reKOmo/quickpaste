import { Request, Response } from "express";
import { TokenTypes } from "../models/Tokens.interface";
import { authToken, generateGuestKey, generatePermaKey } from "../services/tokens.service";

function getRequestToken(req: Request): string | undefined {
    if (req.headers["authorization"]) {
        const frags = req.headers["authorization"].split(" ");
        if (frags.length != 2 || frags[0] !== "ApiKey") return undefined;
        return frags[1];
    } else if (req.cookies["quickpaste_auth"]) {
        return req.cookies["quickpaste_auth"];
    }

    return undefined;
}

async function auth(req: Request, res: Response) {
    const key = getRequestToken(req);

    if (key == undefined) {
        res.status(401).end();
        return;
    }

    try {
        const { userId } = await authToken(key);
        res.setHeader("Authorization", userId).end();
    } catch (err) {
        console.log(err);
        res.status(403).end();
        return;
    }

    // res.send(payload);
}

async function generate(req: Request, res: Response) {
    const header = req.headers["authorization"];

    if (header) {
        const tempToken = header.split(" ")[1];
        try {
            const { userId, accountType } = await authToken(tempToken);
            if (accountType === TokenTypes.TMP) {
                try {
                    const permaToken = await generatePermaKey(userId);
                    res.send({ ok: true, result: permaToken });
                } catch (err) {
                    res.status(500).send({ ok: false, result: "Internal server error" });
                }
            } else {
                res.status(401).end();
            }
        } catch (err) {
            res.status(401).send({ ok: false, result: "Invalid api key" });
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