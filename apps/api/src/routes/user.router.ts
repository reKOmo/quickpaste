import { Router } from "express";
import { getUserInfo, getUserPastes } from "../controllers/user.controller";
import { gatekeep } from "../middlewares/Gatekeeper";
import { parseRequest } from "../middlewares/ParseRequest";

const router = Router();

router.get("/", parseRequest, gatekeep, getUserInfo);

router.get("/pastes", parseRequest, gatekeep, getUserPastes);

export {
    router
};