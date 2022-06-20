import express, { Router } from "express";
import { deletePaste, editPaste, getPaste, uploadPaste } from "../controllers/paste.controller";
import { assertPasteOwnership } from "../middlewares/CheckPasteOwnership";
import { checkUploadPaste } from "../middlewares/CheckUploadedPaste";
import { getPasteData } from "../middlewares/GetPasteData";
import { parseRequest } from "../middlewares/ParseRequest";

const router = Router();

router.use("*", express.json());

router.post("/", parseRequest, checkUploadPaste, uploadPaste);

router.get("/:pasteId", parseRequest, getPasteData, getPaste);

router.delete("/:pasteId", parseRequest, getPasteData, assertPasteOwnership, deletePaste);

router.put("/:pasteId", parseRequest, getPasteData, assertPasteOwnership, checkUploadPaste, editPaste);


export {
    router
};