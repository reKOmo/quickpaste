/// <reference types="cookie-parser" />
import { Request, Response } from "express";
declare function auth(req: Request, res: Response): Promise<void>;
declare function generate(req: Request, res: Response): Promise<void>;
export { auth, generate };
//# sourceMappingURL=key_auth.controller.d.ts.map