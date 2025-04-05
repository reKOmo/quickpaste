"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPasteOwnership = assertPasteOwnership;
exports.assertPasteOwnershipPrivate = assertPasteOwnershipPrivate;
var ServerResponse_1 = require("../utils/ServerResponse");
function assertPasteOwnership(req, res, next) {
    if (req.additional.user != req.additional.pasteData.owner_id) {
        res.status(403).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
function assertPasteOwnershipPrivate(req, res, next) {
    if (req.additional.pasteData.is_private && req.additional.pasteData.owner_id != req.additional.user) {
        res.status(403).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
