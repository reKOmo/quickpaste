import { Router } from "express";
import { getUserInfo } from "../controllers/user.controller";
import { parseRequest } from "../middlewares/ParseRequest";

const router = Router();

router.get("/", parseRequest, getUserInfo);

router.get("/pastes");

export {
    router
};