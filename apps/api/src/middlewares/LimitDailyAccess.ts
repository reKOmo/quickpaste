import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
import * as db from "../services/db.service";
import { ServerResponse } from "../utils/ServerResponse";
import qConfig from "quickpaste-constants";


async function limitDailyAccess(req: FullRequest, res: Response, next: () => void) {
    const pastes = await db.query("SELECT * FROM content_modification WHERE api_key = $1 AND content_modification.accessed = CURRENT_DATE;", [req.additional.apiKey]);
    //TODO move limits to some config file
    const limit = req.additional.user === qConfig.GUEST_ACCOUNT_ID ? qConfig.PASTE.DAILY_CONTENT_LIMITS.guest : qConfig.PASTE.DAILY_CONTENT_LIMITS.loggedIn;
    console.log(pastes.rowCount);
    if (pastes.rowCount >= limit) {
        res.status(429).send(ServerResponse(false, "Tried to create/edit pastes too many times today"));
        return;
    }

    next();
}

export {
    limitDailyAccess
};