import * as jwt from "jsonwebtoken";
import { config } from "../config/jwt.config";
import { Token, TokenTypes, UserToken } from "../models/Tokens.interface";
import * as db from "../services/db.service";
import generateUUID from "../utils/GenerateUUID";

async function authToken(token: string): Promise<{ userId: number, accountType: TokenTypes }> {
    const payload = jwt.decode(token) as Token;
    let userId: number;

    switch (payload.type) {
        case TokenTypes.PERMA:
            userId = await authPermaToken(token);
            break;
        case TokenTypes.GUEST:
            userId = await authGuestToken(token);
            break;
        case TokenTypes.TMP:
            userId = await authTempToken(token);
            break;
    }

    return { userId, accountType: payload.type };
}

async function authPermaToken(token: string): Promise<number> {
    const payload = jwt.decode(token) as UserToken;

    const dbToken = (await db.query("SELECT api_token_id FROM users WHERE id = $1;", [payload.u_id])).rows[0].api_token_id;

    jwt.verify(token, config.secretKey, { jwtid: dbToken.toString() });

    return payload.u_id;
}

async function authGuestToken(token: string): Promise<number> {
    jwt.verify(token, config.secretKey);

    return 0;
}

async function authTempToken(token: string): Promise<number> {
    const payload = jwt.decode(token) as UserToken;

    jwt.verify(token, config.secretKey);

    return payload.u_id;
}

async function generatePermaKey(userId: number): Promise<string> {
    const dbRes = (await db.query("SELECT api_token_id FROM users WHERE id = $1", [userId]));

    if (dbRes.rowCount == 0) {
        throw new Error("invalid user");
    } else {
        const currentId = dbRes.rows[0].api_token_id;

        const newId = (await db.safeQuery("UPDATE users SET api_token_id = $1 RETURNING api_token_id;", [currentId + 1])).rows[0].api_token_id;

        const payload: UserToken = {
            type: TokenTypes.PERMA,
            u_id: userId
        };

        return jwt.sign(payload, config.secretKey, { jwtid: newId.toString() });
    }
}

function generateTempKey(userId: number): string {
    const payload: UserToken = {
        type: TokenTypes.TMP,
        u_id: userId
    };

    return jwt.sign(payload, config.secretKey, { expiresIn: "7d" });
}

function generateGuestKey(ip: string): string {
    const payload: Token = {
        type: TokenTypes.GUEST
    };

    const tokenId = ip + "-" + generateUUID(5);

    return jwt.sign(payload, config.secretKey, { jwtid: tokenId });
}



export {
    authToken,
    generateGuestKey,
    generatePermaKey,
    generateTempKey
};