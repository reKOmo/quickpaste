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
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var paste = __importStar(require("./paste.router"));
var user = __importStar(require("./user.router"));
var internalapi = __importStar(require("./internalapi.router"));
var router = (0, express_1.Router)();
exports.router = router;
router.use(function (req, res, next) {
    req["additional"] = {};
    next();
});
router.get("/api/status", function (_, res) {
    res.send({ stauts: "up", timestamp: +Date.now() });
});
router.use("/api/paste", paste.router);
router.use("/api/user", user.router);
router.use("/internalapi", internalapi.router);
router.all("*", function (_, res) {
    res.status(404).send({ ok: false, result: "Invalid path" });
});
