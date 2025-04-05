import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
declare function assertPasteOwnership(req: FullRequest, res: Response, next: () => void): void;
declare function assertPasteOwnershipPrivate(req: FullRequest, res: Response, next: () => void): void;
export { assertPasteOwnership, assertPasteOwnershipPrivate };
//# sourceMappingURL=CheckPasteOwnership.d.ts.map