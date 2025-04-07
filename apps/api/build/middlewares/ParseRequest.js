import Joi from "joi";
import { Constants } from "../config/constants";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
var pasteIdSchema = Joi.string().length(Constants.PASTE_UUID_LENGTH).pattern(new RegExp('([A-Z]|[a-z]|[0-9])*'));
function parseRequest(req, res, next) {
    var _a;
    var userId = req.headers["x-user"];
    var apiKey = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies["quickpaste_auth"];
    //internal
    if (userId) {
        req.additional["user"] = parseInt(Array.isArray(userId) ? userId[0] : userId);
        req.additional["apiKey"] = apiKey;
    }
    else {
        res.status(400).send("No user id");
        return;
    }
    //external
    var pasteId = req.params.pasteId;
    if (pasteId != undefined) {
        var pasteTest = pasteIdSchema.validate(pasteId);
        if (pasteTest.error) {
            res.status(404).send(ServerResponse(false, DefaultResponses.NOT_FOUND));
            return;
        }
        req.additional["pasteUUID"] = pasteId;
    }
    if (req.headers["paste-authorization"]) {
        req.additional["password"] = Array.isArray(req.headers["paste-authorization"]) ? req.headers["paste-authorization"][0] : req.headers["paste-authorization"];
    }
    next();
}
export { parseRequest };
