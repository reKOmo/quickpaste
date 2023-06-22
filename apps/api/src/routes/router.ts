import { Router } from "express";
import * as paste from "./paste.router";
import * as user from "./user.router";
import * as internalapi from "./internalapi.router";


const router = Router();

router.use((req, res, next) => {
    req["additional"] = {};
    next();
});

router.get("/api/status", (_, res) => {
    res.send({ stauts: "up", timestamp: +Date.now() });
});

router.use("/api/paste", paste.router);

router.use("/api/user", user.router);

router.use("/internalapi", internalapi.router);

router.all("*", (_, res) => {
    res.status(404).send({ ok: false, result: "Invalid path" });
});

export {
    router
};