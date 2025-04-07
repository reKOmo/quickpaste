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
import { deleteFile, deleteFiles, retriveFile, uploadFile } from "../services/s3.service";
import generateUUID from "../utils/GenerateUUID";
import * as db from "../services/db.service";
import { DefaultResponses, ServerResponse } from "../utils/ServerResponse";
import { Constants } from "../config/constants";
import bcrypt from "bcrypt";
import { AES, enc } from "crypto-js";
import { streamToString } from "../utils/StreamToString";
function savePasteToS3(paste, uuid) {
    return __awaiter(this, void 0, void 0, function () {
        var saveReadyPaste, pasteString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    saveReadyPaste = {
                        title: paste.title,
                        fragments: paste.fragments
                    };
                    pasteString = JSON.stringify(saveReadyPaste);
                    if (paste["unhashedPassword"] !== undefined) {
                        pasteString = AES.encrypt(pasteString, paste["unhashedPassword"]).toString();
                    }
                    return [4 /*yield*/, uploadFile(uuid, pasteString)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function uploadPaste(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var paste, client, uuid, saltRounds, psswd, retries, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paste = req.additional.uploadedPaste;
                    return [4 /*yield*/, db.getClient()];
                case 1:
                    client = _a.sent();
                    uuid = generateUUID(Constants.PASTE_UUID_LENGTH);
                    if (!(paste.password !== undefined)) return [3 /*break*/, 3];
                    paste["unhashedPassword"] = paste.password;
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt.hash(paste.password, saltRounds)];
                case 2:
                    psswd = _a.sent();
                    paste.password = psswd;
                    _a.label = 3;
                case 3: return [4 /*yield*/, client.query("BEGIN;")];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 15, , 17]);
                    retries = 0;
                    _a.label = 6;
                case 6:
                    if (!(retries < 10)) return [3 /*break*/, 11];
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, client.query("INSERT INTO pastes (uuid, owner_id, password, is_private, title) VALUES ($1::character varying, $2::integer, $3::character varying, $4::boolean, $5::character varying) returning id;", [uuid, req.additional.user.toString(), paste.password, paste.isPrivate.toString(), paste.title])];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 9:
                    err_1 = _a.sent();
                    if (err_1.code == 23505) {
                        //Duplicate uuid
                        uuid = generateUUID(Constants.PASTE_UUID_LENGTH);
                    }
                    else {
                        client.release();
                        console.error(err_1);
                        throw Error(err_1);
                    }
                    return [3 /*break*/, 10];
                case 10:
                    retries++;
                    return [3 /*break*/, 6];
                case 11: 
                //add frags to storage
                return [4 /*yield*/, savePasteToS3(paste, uuid)];
                case 12:
                    //add frags to storage
                    _a.sent();
                    return [4 /*yield*/, client.query("INSERT INTO content_modification (api_key) VALUES ($1::character varying)", [req.additional.apiKey])];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 14:
                    _a.sent();
                    res.send(ServerResponse(true, {
                        pasteId: uuid
                    }));
                    return [3 /*break*/, 17];
                case 15:
                    err_2 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK;")];
                case 16:
                    _a.sent();
                    console.error(err_2);
                    res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
                    return [3 /*break*/, 17];
                case 17:
                    client.release();
                    return [2 /*return*/];
            }
        });
    });
}
function getPaste(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var s3Ret, err_3, body, bytes, s3Data, fPaste;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, retriveFile(req.additional.pasteUUID)];
                case 1:
                    s3Ret = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, streamToString(s3Ret.Body)];
                case 4:
                    body = _a.sent();
                    if (req.additional.pasteData.password) {
                        bytes = AES.decrypt(body, req.additional.password);
                        body = bytes.toString(enc.Utf8);
                    }
                    s3Data = JSON.parse(body);
                    fPaste = {
                        title: s3Data.title,
                        fragments: s3Data.fragments,
                        isPrivate: req.additional.pasteData.is_private,
                        created: req.additional.pasteData.created,
                        password: req.additional.pasteData.password != undefined,
                        owner: {
                            id: req.additional.pasteData.owner_id,
                            username: req.additional.pasteData.owner_username
                        }
                    };
                    res.send(fPaste);
                    return [2 /*return*/];
            }
        });
    });
}
function editPaste(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var paste, uuid, saltRounds, psswd, client, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paste = req.additional.uploadedPaste;
                    uuid = req.additional.pasteUUID;
                    if (!(paste.password !== undefined)) return [3 /*break*/, 2];
                    paste["unhashedPassword"] = paste.password;
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt.hash(paste.password, saltRounds)];
                case 1:
                    psswd = _a.sent();
                    paste.password = psswd;
                    _a.label = 2;
                case 2: return [4 /*yield*/, db.getClient()];
                case 3:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 10, , 12]);
                    return [4 /*yield*/, client.query("UPDATE pastes SET title = $1::character varying, is_private = $2::boolean, password = $3::character varying WHERE uuid = $4;", [paste.title, paste.isPrivate.toString(), paste.password, uuid])];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, savePasteToS3(paste, uuid)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, client.query("INSERT INTO content_modification (api_key) VALUES ($1::character varying)", [req.additional.apiKey])];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 9:
                    _a.sent();
                    res.send(ServerResponse(true, {
                        pasteId: uuid,
                        message: "Updated paste"
                    }));
                    return [3 /*break*/, 12];
                case 10:
                    err_4 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK;")];
                case 11:
                    _a.sent();
                    console.error(err_4);
                    res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function deletePaste(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uuid, client, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = req.additional.pasteUUID;
                    return [4 /*yield*/, db.getClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 9]);
                    return [4 /*yield*/, client.query("DELETE FROM pastes WHERE uuid = $1;", [uuid])];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, deleteFile(uuid)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 6:
                    _a.sent();
                    res.send(ServerResponse(true, "Paste deleted"));
                    return [3 /*break*/, 9];
                case 7:
                    err_5 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK;")];
                case 8:
                    _a.sent();
                    console.error(err_5);
                    res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
                    return [3 /*break*/, 9];
                case 9:
                    client.release();
                    return [2 /*return*/];
            }
        });
    });
}
function clearOldPastes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var client, oldGuestRes, guestPastesIds, oldUserRes, userPastesIds, pastesToDelete, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, , 11]);
                    return [4 /*yield*/, client.query("SELECT uuid FROM pastes WHERE last_visited::date <= CURRENT_DATE - interval '1' month AND owner_id = 0;")];
                case 4:
                    oldGuestRes = _a.sent();
                    guestPastesIds = oldGuestRes.rows.map(function (p) { return p.uuid; });
                    return [4 /*yield*/, client.query("SELECT uuid FROM pastes WHERE last_visited::date <= CURRENT_DATE - interval '6' month AND owner_id != 0;")];
                case 5:
                    oldUserRes = _a.sent();
                    userPastesIds = oldUserRes.rows.map(function (p) { return p.uuid; });
                    pastesToDelete = guestPastesIds.concat(userPastesIds);
                    // delete old pastes
                    return [4 /*yield*/, client.query("DELETE FROM pastes WHERE uuid = ANY ($1) RETURNING uuid;", [pastesToDelete])];
                case 6:
                    // delete old pastes
                    _a.sent();
                    //!!!!!!!   TODO
                    /*
                    Delete form s3
                    6e60HnuK
            CmqqMGVt
            GNyu6PJ6
            O1QyXbPD
            PjsANha2
            SD16hctw
            XHex9ddI
            Y3QXboGj
            ZO1NZjs0
            lZGV5pQr
            rJICgbGY
            swZ8kjTO
            
                    */
                    return [4 /*yield*/, deleteFiles(pastesToDelete)];
                case 7:
                    //!!!!!!!   TODO
                    /*
                    Delete form s3
                    6e60HnuK
            CmqqMGVt
            GNyu6PJ6
            O1QyXbPD
            PjsANha2
            SD16hctw
            XHex9ddI
            Y3QXboGj
            ZO1NZjs0
            lZGV5pQr
            rJICgbGY
            swZ8kjTO
            
                    */
                    _a.sent();
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 8:
                    _a.sent();
                    res.send("Removed (" + pastesToDelete.length + "): " + JSON.stringify(pastesToDelete));
                    return [3 /*break*/, 11];
                case 9:
                    err_6 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK;")];
                case 10:
                    _a.sent();
                    console.error(err_6);
                    res.status(500).send(ServerResponse(false, DefaultResponses.SERVER_ERROR));
                    return [3 /*break*/, 11];
                case 11:
                    client.release();
                    return [2 /*return*/];
            }
        });
    });
}
export { uploadPaste, getPaste, editPaste, deletePaste, clearOldPastes };
