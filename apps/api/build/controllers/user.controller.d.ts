import { Response } from "express";
import { FullRequest } from "../models/FullRequest.interface";
declare function getUserInfo(req: FullRequest, res: Response): Promise<void>;
declare function getUserPastes(req: FullRequest, res: Response): Promise<void>;
declare function deleteAccount(req: FullRequest, res: Response): Promise<void>;
export { getUserInfo, getUserPastes, deleteAccount };
//# sourceMappingURL=user.controller.d.ts.map