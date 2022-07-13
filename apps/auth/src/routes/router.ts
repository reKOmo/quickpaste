import cookieParser from "cookie-parser";
import { Router, json } from "express";
import * as api_key from "../controllers/key_auth.controller";
import * as user from "../controllers/user.controller";


const router = Router();

router.all("/keys/auth", cookieParser(), api_key.auth);
router.all("/keys/generate", cookieParser(), api_key.generate);

router.post("/user/login", json(), user.login);


router.all("*", (_, res) => {
    res.status(404).send({ ok: false, result: "Invalid path" });
});

export {
    router
};