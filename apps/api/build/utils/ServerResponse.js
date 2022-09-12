"use strict";
exports.__esModule = true;
exports.DefaultResponses = exports.ServerResponse = void 0;
function ServerResponse(succ, body) {
    return {
        ok: succ,
        result: body
    };
}
exports.ServerResponse = ServerResponse;
var DefaultResponses;
(function (DefaultResponses) {
    DefaultResponses["SERVER_ERROR"] = "Internal server error";
    DefaultResponses["NOT_FOUND"] = "Resource not found";
    DefaultResponses["UNAUTHORIZED"] = "Not sufficient previlages to access resource";
})(DefaultResponses = exports.DefaultResponses || (exports.DefaultResponses = {}));
