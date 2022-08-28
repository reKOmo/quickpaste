import { Request, Response } from "express";
import Joi from "joi";
import * as db from "../services/db.service";
import axios from "axios";
import { generateTempKey } from "../services/tokens.service";
import axiosRetry from "axios-retry";

const loginData = Joi.object({
    type: Joi.string().valid("github").required(),
    token: Joi.string().required()
});

async function login(req: Request, res: Response) {
    const body = req.body;
    const data = loginData.validate(body);

    if (data.error) {
        res.status(403).send({ ok: false, result: "Incorrect data format" });
        return;
    }

    let token = "";
    try {
        switch (data.value.type) {
            case "github":
                token = await loginGithub(data.value);
                break;
        }
    } catch (err) {
        res.status(500).send(err);
        return;
    }

    res.send(token);
}

async function loginGithub(data: any): Promise<string> {

    axiosRetry(axios, {
        retries: 3
    });

    const res = await axios({
        url: "https://api.github.com/user",
        method: "GET",
        headers: {
            "Authorization": `token ${data.token}`
        }
    });

    if (res.status !== 200) {
        throw new Error("Failed to login with github");
    }

    const userData = await res.data;

    const username = userData.login;
    const userId = userData.id;

    // get data form db or add to db
    const extId = data.type + "/" + JSON.stringify(userId);
    const internalData = await db.query("SELECT id FROM users WHERE ext_id = $1;", [extId]);
    let internalId = -1;
    if (internalData.rowCount == 0) {
        // create account
        internalId = await createAccount(username, extId);
    } else {
        internalId = internalData.rows[0].id;
    }
    //TODO update data in db from github (like username)

    return generateTempKey(internalId);
}

async function createAccount(username: string, extId: string = null): Promise<number> {
    const res = await db.safeQuery("INSERT INTO users (username, ext_id) VALUES ($1::character varying, $2::character varying) returning id;", [username, extId]);
    const userId = res.rows[0].id;

    return userId;
}


export {
    login
};