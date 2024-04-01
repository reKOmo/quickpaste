import { QueryResult } from "pg";
export declare function query(query: string, params: unknown[]): Promise<QueryResult>;
export declare function safeQuery(query: string, params: unknown[]): Promise<QueryResult>;
export declare function getClient(): Promise<any>;
//# sourceMappingURL=db.service.d.ts.map