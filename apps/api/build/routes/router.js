import { Router } from "express";
import * as paste from "./paste.router";
import * as user from "./user.router";
import * as internalapi from "./internalapi.router";
var router = Router();
router.use(function (req, res, next) {
    req["additional"] = {};
    next();
});
router.get("/api/status", function (_, res) {
    res.send({ stauts: "up", timestamp: +Date.now() });
});
router.use("/api/paste", paste.router);
router.use("/api/user", user.router);
router.use("/internalapi", internalapi.router);
router.all("*", function (_, res) {
    res.status(404).send({ ok: false, result: "Invalid path" });
});
export { router };
