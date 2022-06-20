import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as db from "../services/db.service";
import { config } from "../config/jwt.config";

async function auth(req: Request, res: Response) {
    const header = req.headers["authorization"];
    const key = header.split(" ")[1];

    try {
        const payload = jwt.decode(key) as { userId: string };

        const dbToken = (await db.query("SELECT api_token_id FROM users WHERE id = $1;", [payload.userId])).rows[0].api_token_id;

        jwt.verify(key, config.secretKey, { jwtid: dbToken.toString() }, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).send(err);
            } else {
                res.setHeader("Authorization", payload.userId);
                res.end();
            }
        });
    } catch (err) {
        res.send(err);
    }

    // res.send(payload);
}

async function generate(req: Request, res: Response) {
    const header = req.headers["x-user"];
    const userId: number = parseInt(typeof header === "string" ? header : header[0]);

    const dbRes = (await db.query("SELECT api_token_id FROM users WHERE id = $1", [userId]));

    if (dbRes.rowCount == 0) {
        res.status(400).send("Invalid user");
    } else {
        const currentId = dbRes.rows[0].api_token_id;

        const newId = (await db.safeQuery("UPDATE users SET api_token_id = $1 RETURNING api_token_id;", [currentId + 1])).rows[0].api_token_id;

        console.log(newId);

        const payload = {
            userId
        };

        jwt.sign(payload, config.secretKey, { jwtid: newId.toString() }, (err, encoded) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ token: encoded });
            }
        });
    }
}

export {
    auth,
    generate
};