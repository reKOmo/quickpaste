import { Router } from "express";
import * as internalapi from "./internalapi.router";
import { deleteAccount, getUserInfo, getUserPastes } from "../controllers/user.controller";
import { gatekeep } from "../middlewares/Gatekeeper";
import { parseRequest } from "../middlewares/ParseRequest";
import cookieParser from "cookie-parser";

const router = Router();

router.use("*name", cookieParser(), parseRequest, gatekeep);

router.get("/", getUserInfo);

router.get("/pastes", getUserPastes);

internalapi.router.delete("/user", parseRequest, gatekeep, deleteAccount);

export {
    router
};