import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
function assertPasteOwnership(req, res, next) {
    if (req.additional.user != req.additional.pasteData.owner_id) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
function assertPasteOwnershipPrivate(req, res, next) {
    if (req.additional.pasteData.is_private && req.additional.pasteData.owner_id != req.additional.user) {
        res.status(403).send(ServerResponse(false, DefaultResponses.UNAUTHORIZED));
        return;
    }
    next();
}
export { assertPasteOwnership, assertPasteOwnershipPrivate };
