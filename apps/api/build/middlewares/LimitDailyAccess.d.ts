import { FullRequest } from "../models/FullRequest.interface";
import { Response } from "express";
declare function limitDailyAccess(req: FullRequest, res: Response, next: () => void): Promise<void>;
export { limitDailyAccess };
//# sourceMappingURL=LimitDailyAccess.d.ts.map