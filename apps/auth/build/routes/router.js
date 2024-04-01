"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = require("express");
var api_key = __importStar(require("../controllers/key_auth.controller"));
var user = __importStar(require("../controllers/user.controller"));
var router = (0, express_1.Router)();
exports.router = router;
router.all("/keys/auth", (0, cookie_parser_1["default"])(), api_key.auth);
router.all("/keys/generate", (0, cookie_parser_1["default"])(), api_key.generate);
router.post("/user/login", (0, express_1.json)(), user.login);
router.all("*", function (_, res) {
    res.status(404).send({ ok: false, result: "Invalid path" });
});
