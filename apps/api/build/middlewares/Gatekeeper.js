"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatekeep = gatekeep;
const ServerResponse_1 = require("../utils/ServerResponse");
const quickpaste_constants_1 = __importDefault(require("quickpaste-constants"));
function gatekeep(req, res, next) {
    const userId = req.additional.user;
    if (quickpaste_constants_1.default.PROTECTED_ACCOUNTS.includes(userId)) {
        res.status(403).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
