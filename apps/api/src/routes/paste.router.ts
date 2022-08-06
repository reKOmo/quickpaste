import express, { Router } from "express";
import { deletePaste, editPaste, getPaste, uploadPaste } from "../controllers/paste.controller";
import { assertPasteOwnership } from "../middlewares/CheckPasteOwnership";
import { checkUploadPaste } from "../middlewares/CheckUploadedPaste";
import { gatekeep } from "../middlewares/Gatekeeper";
import { getPasteData } from "../middlewares/GetPasteData";
import { parseRequest } from "../middlewares/ParseRequest";
import { checkPassword } from "../middlewares/CheckPastePassword";

const router = Router();

router.use("*", express.json());

router.post("/", parseRequest, checkUploadPaste, uploadPaste);

router.get("/:pasteId", parseRequest, getPasteData, checkPassword, getPaste);

router.delete("/:pasteId", parseRequest, gatekeep, getPasteData, assertPasteOwnership, deletePaste);

router.put("/:pasteId", parseRequest, gatekeep, getPasteData, assertPasteOwnership, checkPassword, checkUploadPaste, editPaste);


export {
    router
};