import { TokenTypes } from "../models/Tokens.interface";
declare function authToken(token: string): Promise<{
    userId: number;
    accountType: TokenTypes;
}>;
declare function generatePermaKey(userId: number): Promise<string>;
declare function generateTempKey(userId: number): string;
declare function generateGuestKey(ip: string): string;
export { authToken, generateGuestKey, generatePermaKey, generateTempKey };
//# sourceMappingURL=tokens.service.d.ts.map