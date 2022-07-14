import { Router } from "express";
import { getUserInfo, getUserPastes } from "../controllers/user.controller";
import { parseRequest } from "../middlewares/ParseRequest";

const router = Router();

router.get("/", parseRequest, getUserInfo);

router.get("/pastes", parseRequest, getUserPastes);

export {
    router
};