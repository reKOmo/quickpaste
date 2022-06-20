import { Request } from "express";
import { PasteUpload } from "interfaces";
import { DbPaste } from "./DbPaste.interface";

export interface FullRequest extends Request {
    additional: {
        user?: number,
        pasteUUID?: string,
        pasteData?: DbPaste
        uploadedPaste?: PasteUpload
    }
}