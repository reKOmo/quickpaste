import { Request, Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
declare function uploadPaste(req: FullRequest, res: Response): Promise<void>;
declare function getPaste(req: FullRequest, res: Response): Promise<void>;
declare function editPaste(req: FullRequest, res: Response): Promise<void>;
declare function deletePaste(req: FullRequest, res: Response): Promise<void>;
declare function clearOldPastes(req: Request, res: Response): Promise<void>;
export { uploadPaste, getPaste, editPaste, deletePaste, clearOldPastes };
//# sourceMappingURL=paste.controller.d.ts.map