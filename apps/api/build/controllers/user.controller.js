var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import * as db from "../services/db.service";
import { deleteFile } from "../services/s3.service";
import Joi from "joi";
var getPasteParams = Joi.object({
    amount: Joi.number().min(1).max(100).default(20),
    // lastPasteID
    pageId: Joi.number().positive().optional()
});
function getUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, dbData, userData, dataToSend, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.additional.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db.query("SELECT * FROM users WHERE users.id = $1", [userId])];
                case 2:
                    dbData = _a.sent();
                    if (dbData.rowCount < 1) {
                        res.status(401).send(DefaultResponses.UNAUTHORIZED);
                        return [2 /*return*/];
                    }
                    userData = dbData.rows[0];
                    dataToSend = {
                        id: userData.id,
                        username: userData.username,
                        joined: userData.joined
                    };
                    res.send(dataToSend);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.status(500).send(DefaultResponses.SERVER_ERROR);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUserPastes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var validParams, userId, query, params, userPastes, userData_1, pastes, response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validParams = getPasteParams.validate(req.query);
                    if (validParams.error) {
                        res.status(400).send(ServerResponse(false, "Invalid params: " + validParams.error.message));
                        return [2 /*return*/];
                    }
                    userId = req.additional.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    query = "SELECT * FROM pastes WHERE pastes.owner_id = $1" + (validParams.value.pageId !== undefined ? " AND pastes.id < $3 " : " ") + "ORDER BY pastes.created DESC LIMIT $2";
                    params = [userId, validParams.value.amount];
                    if (validParams.value.pageId !== undefined)
                        params.push(validParams.value.pageId);
                    return [4 /*yield*/, db.query(query, params)];
                case 2:
                    userPastes = _a.sent();
                    return [4 /*yield*/, db.query("SELECT username, id FROM users WHERE users.id = $1", [userId])];
                case 3:
                    userData_1 = (_a.sent()).rows[0];
                    pastes = userPastes.rows.map(function (f) { return ({
                        title: f.title,
                        isPrivate: f.is_private,
                        password: f.password != null,
                        created: f.created,
                        owner: userData_1,
                        uuid: f.uuid
                    }); });
                    response = {
                        pastes: pastes
                    };
                    if (userPastes.rowCount > 0) {
                        response["nextPage"] = userPastes.rows[userPastes.rowCount - 1].id;
                    }
                    res.send(ServerResponse(true, response));
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2);
                    res.status(500).send(DefaultResponses.SERVER_ERROR);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function deleteAccount(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, client, dbRes, deletedPastes, i, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.additional.user;
                    return [4 /*yield*/, db.getClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 11, , 13]);
                    return [4 /*yield*/, client.query("DELETE FROM users WHERE users.id = $1;", [userId])];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client.query("DELETE FROM pastes WHERE pastes.owner_id = $1 RETURNING pastes.uuid;", [userId])];
                case 5:
                    dbRes = _a.sent();
                    deletedPastes = dbRes.rows;
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < deletedPastes.length)) return [3 /*break*/, 9];
                    return [4 /*yield*/, deleteFile(deletedPastes[i].uuid)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9: return [4 /*yield*/, client.query("COMMIT;")];
                case 10:
                    _a.sent();
                    res.send(ServerResponse(true, "Account deleted"));
                    return [3 /*break*/, 13];
                case 11:
                    err_3 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK;")];
                case 12:
                    _a.sent();
                    console.error(err_3);
                    res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
                    return [3 /*break*/, 13];
                case 13:
                    client.release();
                    return [2 /*return*/];
            }
        });
    });
}
export { getUserInfo, getUserPastes, deleteAccount };
