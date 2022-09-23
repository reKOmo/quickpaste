import express, { Router } from "express";
import cookieParser from "cookie-parser";
import * as internalapi from "./internalapi.router";
import { clearOldPastes, deletePaste, editPaste, getPaste, uploadPaste } from "../controllers/paste.controller";
import { assertPasteOwnership, assertPasteOwnershipPrivate } from "../middlewares/CheckPasteOwnership";
import { checkUploadPaste } from "../middlewares/CheckUploadedPaste";
import { gatekeep } from "../middlewares/Gatekeeper";
import { getPasteData } from "../middlewares/GetPasteData";
import { parseRequest } from "../middlewares/ParseRequest";
import { checkPassword } from "../middlewares/CheckPastePassword";
import { limitDailyAccess } from "../middlewares/LimitDailyAccess";

const router = Router();

router.use("*", express.json(), cookieParser(), parseRequest);

router.post("/", limitDailyAccess, checkUploadPaste, uploadPaste);

router.get("/:pasteId", getPasteData, assertPasteOwnershipPrivate, checkPassword, getPaste);

router.delete("/:pasteId", gatekeep, getPasteData, assertPasteOwnership, deletePaste);

router.put("/:pasteId", gatekeep, limitDailyAccess, getPasteData, assertPasteOwnership, checkPassword, checkUploadPaste, editPaste);

internalapi.router.get("/pastes/clear-old", clearOldPastes);

export {
    router
};