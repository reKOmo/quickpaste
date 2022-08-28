import { Router } from "express";
import * as internalapi from "./internalapi.router";
import { deleteAccount, getUserInfo, getUserPastes } from "../controllers/user.controller";
import { gatekeep } from "../middlewares/Gatekeeper";
import { parseRequest } from "../middlewares/ParseRequest";

const router = Router();

router.get("/", parseRequest, gatekeep, getUserInfo);

router.get("/pastes", parseRequest, gatekeep, getUserPastes);

internalapi.router.delete("/user", parseRequest, gatekeep, deleteAccount);

export {
    router
};