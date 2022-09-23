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
var express_1 = __importStar(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var internalapi = __importStar(require("./internalapi.router"));
var paste_controller_1 = require("../controllers/paste.controller");
var CheckPasteOwnership_1 = require("../middlewares/CheckPasteOwnership");
var CheckUploadedPaste_1 = require("../middlewares/CheckUploadedPaste");
var Gatekeeper_1 = require("../middlewares/Gatekeeper");
var GetPasteData_1 = require("../middlewares/GetPasteData");
var ParseRequest_1 = require("../middlewares/ParseRequest");
var CheckPastePassword_1 = require("../middlewares/CheckPastePassword");
var LimitDailyAccess_1 = require("../middlewares/LimitDailyAccess");
var router = (0, express_1.Router)();
exports.router = router;
router.use("*", express_1["default"].json(), (0, cookie_parser_1["default"])(), ParseRequest_1.parseRequest);
router.post("/", LimitDailyAccess_1.limitDailyAccess, CheckUploadedPaste_1.checkUploadPaste, paste_controller_1.uploadPaste);
router.get("/:pasteId", GetPasteData_1.getPasteData, CheckPasteOwnership_1.assertPasteOwnershipPrivate, CheckPastePassword_1.checkPassword, paste_controller_1.getPaste);
router["delete"]("/:pasteId", Gatekeeper_1.gatekeep, GetPasteData_1.getPasteData, CheckPasteOwnership_1.assertPasteOwnership, paste_controller_1.deletePaste);
router.put("/:pasteId", Gatekeeper_1.gatekeep, LimitDailyAccess_1.limitDailyAccess, GetPasteData_1.getPasteData, CheckPasteOwnership_1.assertPasteOwnership, CheckPastePassword_1.checkPassword, CheckUploadedPaste_1.checkUploadPaste, paste_controller_1.editPaste);
internalapi.router.get("/pastes/clear-old", paste_controller_1.clearOldPastes);
