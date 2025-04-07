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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const internalapi = __importStar(require("./internalapi.router"));
const paste_controller_1 = require("../controllers/paste.controller");
const CheckPasteOwnership_1 = require("../middlewares/CheckPasteOwnership");
const CheckUploadedPaste_1 = require("../middlewares/CheckUploadedPaste");
const Gatekeeper_1 = require("../middlewares/Gatekeeper");
const GetPasteData_1 = require("../middlewares/GetPasteData");
const ParseRequest_1 = require("../middlewares/ParseRequest");
const CheckPastePassword_1 = require("../middlewares/CheckPastePassword");
const LimitDailyAccess_1 = require("../middlewares/LimitDailyAccess");
const router = (0, express_1.Router)();
exports.router = router;
router.use("*", express_1.default.json(), (0, cookie_parser_1.default)());
router.post("/", ParseRequest_1.parseRequest, LimitDailyAccess_1.limitDailyAccess, CheckUploadedPaste_1.checkUploadPaste, paste_controller_1.uploadPaste);
router.get("/:pasteId", ParseRequest_1.parseRequest, GetPasteData_1.getPasteData, CheckPasteOwnership_1.assertPasteOwnershipPrivate, CheckPastePassword_1.checkPassword, paste_controller_1.getPaste);
router.delete("/:pasteId", ParseRequest_1.parseRequest, Gatekeeper_1.gatekeep, GetPasteData_1.getPasteData, CheckPasteOwnership_1.assertPasteOwnership, paste_controller_1.deletePaste);
router.put("/:pasteId", ParseRequest_1.parseRequest, Gatekeeper_1.gatekeep, LimitDailyAccess_1.limitDailyAccess, GetPasteData_1.getPasteData, CheckPasteOwnership_1.assertPasteOwnership, CheckPastePassword_1.checkPassword, CheckUploadedPaste_1.checkUploadPaste, paste_controller_1.editPaste);
internalapi.router.get("/pastes/clear-old", paste_controller_1.clearOldPastes);
