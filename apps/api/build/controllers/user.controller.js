"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getUserInfo = getUserInfo;
exports.getUserPastes = getUserPastes;
exports.deleteAccount = deleteAccount;
const ServerResponse_1 = require("../utils/ServerResponse");
const db = __importStar(require("../services/db.service"));
const s3_service_1 = require("../services/s3.service");
const joi_1 = __importDefault(require("joi"));
const getPasteParams = joi_1.default.object({
    amount: joi_1.default.number().min(1).max(100).default(20),
    // lastPasteID
    pageId: joi_1.default.number().positive().optional()
});
function getUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.additional.user;
        console.log(req.additional);
        try {
            const dbData = yield db.query("SELECT * FROM users WHERE users.id = $1", [userId]);
            if (dbData.rowCount < 1) {
                res.status(401).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.UNAUTHORIZED));
                return;
            }
            const userData = dbData.rows[0];
            const dataToSend = {
                id: userData.id,
                username: userData.username,
                joined: userData.joined
            };
            res.send(dataToSend);
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
    });
}
function getUserPastes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validParams = getPasteParams.validate(req.query);
        if (validParams.error) {
            res.status(400).send((0, ServerResponse_1.ServerResponse)(false, "Invalid params: " + validParams.error.message));
            return;
        }
        const userId = req.additional.user;
        try {
            const query = "SELECT * FROM pastes WHERE pastes.owner_id = $1" + (validParams.value.pageId !== undefined ? " AND pastes.id < $3 " : " ") + "ORDER BY pastes.created DESC LIMIT $2";
            const params = [userId, validParams.value.amount];
            if (validParams.value.pageId !== undefined)
                params.push(validParams.value.pageId);
            const userPastes = yield db.query(query, params);
            const userData = (yield db.query("SELECT username, id FROM users WHERE users.id = $1", [userId])).rows[0];
            const pastes = userPastes.rows.map((f) => ({
                title: f.title,
                isPrivate: f.is_private,
                password: f.password != null,
                created: f.created,
                owner: userData,
                uuid: f.uuid
            }));
            const response = {
                pastes
            };
            if (userPastes.rowCount > 0) {
                response["nextPage"] = userPastes.rows[userPastes.rowCount - 1].id;
            }
            res.send((0, ServerResponse_1.ServerResponse)(true, response));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
    });
}
function deleteAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.additional.user;
        const client = yield db.getClient();
        yield client.query("BEGIN;");
        try {
            yield client.query("DELETE FROM users WHERE users.id = $1;", [userId]);
            const dbRes = yield client.query("DELETE FROM pastes WHERE pastes.owner_id = $1 RETURNING pastes.uuid;", [userId]);
            const deletedPastes = dbRes.rows;
            for (let i = 0; i < deletedPastes.length; i++) {
                yield (0, s3_service_1.deleteFile)(deletedPastes[i].uuid);
            }
            yield client.query("COMMIT;");
            res.send((0, ServerResponse_1.ServerResponse)(true, "Account deleted"));
        }
        catch (err) {
            yield client.query("ROLLBACK;");
            console.error(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
        client.release();
    });
}
