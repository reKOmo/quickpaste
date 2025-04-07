"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResponses = void 0;
exports.ServerResponse = ServerResponse;
function ServerResponse(succ, body) {
    return {
        ok: succ,
        result: body
    };
}
var DefaultResponses;
(function (DefaultResponses) {
    DefaultResponses["SERVER_ERROR"] = "Internal server error";
    DefaultResponses["NOT_FOUND"] = "Resource not found";
    DefaultResponses["UNAUTHORIZED"] = "Not sufficient previlages to access resource";
})(DefaultResponses || (exports.DefaultResponses = DefaultResponses = {}));
