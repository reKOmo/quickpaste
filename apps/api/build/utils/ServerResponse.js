export function ServerResponse(succ, body) {
    return {
        ok: succ,
        result: body
    };
}
export var DefaultResponses;
(function (DefaultResponses) {
    DefaultResponses["SERVER_ERROR"] = "Internal server error";
    DefaultResponses["NOT_FOUND"] = "Resource not found";
    DefaultResponses["UNAUTHORIZED"] = "Not sufficient previlages to access resource";
})(DefaultResponses || (DefaultResponses = {}));
