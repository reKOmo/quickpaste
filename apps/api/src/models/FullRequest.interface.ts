import { Request } from "express";
import { PasteUpload } from "interfaces";
import { DbPaste } from "./DbPaste.interface";

export interface FullRequest extends Request {
    additional: {
        apiKey: string,
        user: number,
        password?: string,
        pasteUUID?: string,
        pasteData?: DbPaste
        uploadedPaste?: PasteUpload,
    }
}