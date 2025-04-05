export declare function ServerResponse(succ: boolean, body: unknown): {
    ok: boolean;
    result: unknown;
};
export declare enum DefaultResponses {
    SERVER_ERROR = "Internal server error",
    NOT_FOUND = "Resource not found",
    UNAUTHORIZED = "Not sufficient previlages to access resource"
}
//# sourceMappingURL=ServerResponse.d.ts.map