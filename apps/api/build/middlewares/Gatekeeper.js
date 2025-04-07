import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import qConfig from "quickpaste-constants";
export function gatekeep(req, res, next) {
    var userId = req.additional.user;
    if (qConfig.PROTECTED_ACCOUNTS.includes(userId)) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
