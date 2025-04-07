"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequest = parseRequest;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../config/constants");
const ServerResponse_1 = require("../utils/ServerResponse");
const pasteIdSchema = joi_1.default.string().length(constants_1.Constants.PASTE_UUID_LENGTH).pattern(new RegExp('([A-Z]|[a-z]|[0-9])*'));
function parseRequest(req, res, next) {
    var _a;
    const userId = req.headers["x-user"];
    const apiKey = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies["quickpaste_auth"];
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
    const pasteId = req.params.pasteId;
    if (pasteId != undefined) {
        const pasteTest = pasteIdSchema.validate(pasteId);
        if (pasteTest.error) {
            res.status(404).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.NOT_FOUND));
            return;
        }
        req.additional["pasteUUID"] = pasteId;
    }
    if (req.headers["paste-authorization"]) {
        req.additional["password"] = Array.isArray(req.headers["paste-authorization"]) ? req.headers["paste-authorization"][0] : req.headers["paste-authorization"];
    }
    next();
}
