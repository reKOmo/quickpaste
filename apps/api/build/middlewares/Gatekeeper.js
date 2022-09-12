"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.gatekeep = void 0;
var ServerResponse_1 = require("../utils/ServerResponse");
var quickpaste_constants_1 = __importDefault(require("quickpaste-constants"));
function gatekeep(req, res, next) {
    var userId = req.additional.user;
    if (quickpaste_constants_1["default"].PROTECTED_ACCOUNTS.includes(userId)) {
        res.status(403).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
exports.gatekeep = gatekeep;
