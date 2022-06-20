export function ServerResponse(succ: boolean, body: unknown): { ok: boolean, result: unknown } {
    return {
        ok: succ,
        result: body
    };
}

export enum DefaultResponses {
    SERVER_ERROR = "Internal server error",
    NOT_FOUND = "Resource not found",
    UNAUTHORIZED = "Not sufficient previlages to access resource"
}