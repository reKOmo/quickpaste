import { Router } from "express";
import * as paste from "./paste.router";
import * as user from "./user.router";


const router = Router();

router.use((req, res, next) => {
    req["additional"] = {};
    next();
});

router.get("/api", (_, res) => {
    res.send("Test");
});

router.use("/api/paste", paste.router);

router.use("/api/user/:userId", user.router);

router.all("*", (_, res) => {
    res.send({ ok: false, result: "Invalid path" });
});

export {
    router
};