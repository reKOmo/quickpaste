import { Request, Response } from "express";
import Joi from "joi";
import * as db from "../services/db.service";
import jwt from "jsonwebtoken";
import * as jwtConfig from "../config/jwt.config";
import axios from "axios";
import { generateTempKey } from "../services/tokens.service";

const loginData = Joi.object({
    type: Joi.string().valid("github").required(),
    token: Joi.string().required()
});

async function login(req: Request, res: Response) {
    console.log(req.body);
    const body = req.body;
    const data = loginData.validate(body);

    console.log(data);

    if (data.error) {
        //TODO

        return;
    }

    let token = "";
    switch (data.value.type) {
        case "github":
            token = await loginGithub(data.value);
            break;
    }

    console.log(token);

    res.send(token);
}

async function loginGithub(data: any): Promise<string> {

    const res = await axios({
        url: "https://api.github.com/user",
        method: "GET",
        headers: {
            "Authorization": `token ${data.token}`
        }
    });

    //TODO Error hanlde

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
    const userId = res.rows[0];

    return userId;
}


export {
    login
};