import { Router } from "express";
import * as api_key from "../controllers/key_auth.controller";


const router = Router();

router.all("/api-key/auth", api_key.auth);
router.all("/api-key/generate", api_key.generate);

router.all("*", (_, res) => {
    res.status(404).send({ ok: false, result: "Invalid path" });
});

export {
    router
};