import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
declare function checkPassword(req: FullRequest, res: Response, next: () => void): Promise<void>;
export { checkPassword };
//# sourceMappingURL=CheckPastePassword.d.ts.map