"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = checkPassword;
const ServerResponse_1 = require("../utils/ServerResponse");
const bcrypt_1 = __importDefault(require("bcrypt"));
function checkPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.additional.pasteData.password) {
            if (req.additional.password === undefined) {
                res.status(401).send((0, ServerResponse_1.ServerResponse)(false, "No password provided"));
                return;
            }
            const match = yield bcrypt_1.default.compare(req.additional.password, req.additional.pasteData.password);
            if (match) {
                next();
                return;
            }
            res.status(401).send((0, ServerResponse_1.ServerResponse)(false, "Incorrect password"));
            return;
        }
        next();
    });
}
