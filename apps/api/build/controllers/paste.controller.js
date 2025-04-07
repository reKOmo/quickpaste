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
exports.uploadPaste = uploadPaste;
exports.getPaste = getPaste;
exports.editPaste = editPaste;
exports.deletePaste = deletePaste;
exports.clearOldPastes = clearOldPastes;
const s3_service_1 = require("../services/s3.service");
const GenerateUUID_1 = __importDefault(require("../utils/GenerateUUID"));
const db = __importStar(require("../services/db.service"));
const ServerResponse_1 = require("../utils/ServerResponse");
const constants_1 = require("../config/constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = require("crypto-js");
const StreamToString_1 = require("../utils/StreamToString");
function savePasteToS3(paste, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveReadyPaste = {
            title: paste.title,
            fragments: paste.fragments
        };
        let pasteString = JSON.stringify(saveReadyPaste);
        if (paste["unhashedPassword"] !== undefined) {
            pasteString = crypto_js_1.AES.encrypt(pasteString, paste["unhashedPassword"]).toString();
        }
        yield (0, s3_service_1.uploadFile)(uuid, pasteString);
    });
}
function uploadPaste(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paste = req.additional.uploadedPaste;
        const client = yield db.getClient();
        let uuid = (0, GenerateUUID_1.default)(constants_1.Constants.PASTE_UUID_LENGTH);
        if (paste.password !== undefined) {
            paste["unhashedPassword"] = paste.password;
            const saltRounds = 10;
            const psswd = yield bcrypt_1.default.hash(paste.password, saltRounds);
            paste.password = psswd;
        }
        yield client.query("BEGIN;");
        try {
            //try to get uuid
            for (let retries = 0; retries < 10; retries++) {
                try {
                    yield client.query("INSERT INTO pastes (uuid, owner_id, password, is_private, title) VALUES ($1::character varying, $2::integer, $3::character varying, $4::boolean, $5::character varying) returning id;", [uuid, req.additional.user.toString(), paste.password, paste.isPrivate.toString(), paste.title]);
                    break;
                }
                catch (err) {
                    if (err.code == 23505) {
                        //Duplicate uuid
                        uuid = (0, GenerateUUID_1.default)(constants_1.Constants.PASTE_UUID_LENGTH);
                    }
                    else {
                        client.release();
                        console.error(err);
                        throw Error(err);
                    }
                }
            }
            //add frags to storage
            yield savePasteToS3(paste, uuid);
            yield client.query("INSERT INTO content_modification (api_key) VALUES ($1::character varying)", [req.additional.apiKey]);
            yield client.query("COMMIT;");
            res.send((0, ServerResponse_1.ServerResponse)(true, {
                pasteId: uuid
            }));
        }
        catch (err) {
            yield client.query("ROLLBACK;");
            console.error(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
        client.release();
    });
}
function getPaste(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let s3Ret;
        try {
            s3Ret = yield (0, s3_service_1.retriveFile)(req.additional.pasteUUID);
        }
        catch (err) {
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
            return;
        }
        let body = yield (0, StreamToString_1.streamToString)(s3Ret.Body);
        if (req.additional.pasteData.password) {
            const bytes = crypto_js_1.AES.decrypt(body, req.additional.password);
            body = bytes.toString(crypto_js_1.enc.Utf8);
        }
        const s3Data = JSON.parse(body);
        const fPaste = {
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
    });
}
function editPaste(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paste = req.additional.uploadedPaste;
        const uuid = req.additional.pasteUUID;
        if (paste.password !== undefined) {
            paste["unhashedPassword"] = paste.password;
            const saltRounds = 10;
            const psswd = yield bcrypt_1.default.hash(paste.password, saltRounds);
            paste.password = psswd;
        }
        const client = yield db.getClient();
        yield client.query("BEGIN;");
        try {
            yield client.query("UPDATE pastes SET title = $1::character varying, is_private = $2::boolean, password = $3::character varying WHERE uuid = $4;", [paste.title, paste.isPrivate.toString(), paste.password, uuid]);
            yield savePasteToS3(paste, uuid);
            yield client.query("INSERT INTO content_modification (api_key) VALUES ($1::character varying)", [req.additional.apiKey]);
            yield client.query("COMMIT;");
            res.send((0, ServerResponse_1.ServerResponse)(true, {
                pasteId: uuid,
                message: "Updated paste"
            }));
        }
        catch (err) {
            yield client.query("ROLLBACK;");
            console.error(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
    });
}
function deletePaste(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = req.additional.pasteUUID;
        const client = yield db.getClient();
        yield client.query("BEGIN;");
        try {
            yield client.query("DELETE FROM pastes WHERE uuid = $1;", [uuid]);
            yield (0, s3_service_1.deleteFile)(uuid);
            yield client.query("COMMIT;");
            res.send((0, ServerResponse_1.ServerResponse)(true, "Paste deleted"));
        }
        catch (err) {
            yield client.query("ROLLBACK;");
            console.error(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
        client.release();
    });
}
function clearOldPastes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db.getClient();
        yield client.query("BEGIN;");
        try {
            // get guest pastes
            const oldGuestRes = yield client.query("SELECT uuid FROM pastes WHERE last_visited::date <= CURRENT_DATE - interval '1' month AND owner_id = 0;");
            const guestPastesIds = oldGuestRes.rows.map(p => p.uuid);
            // get user pastes
            const oldUserRes = yield client.query("SELECT uuid FROM pastes WHERE last_visited::date <= CURRENT_DATE - interval '6' month AND owner_id != 0;");
            const userPastesIds = oldUserRes.rows.map(p => p.uuid);
            const pastesToDelete = guestPastesIds.concat(userPastesIds);
            // delete old pastes
            yield client.query("DELETE FROM pastes WHERE uuid = ANY ($1) RETURNING uuid;", [pastesToDelete]);
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
            yield (0, s3_service_1.deleteFiles)(pastesToDelete);
            yield client.query("COMMIT;");
            res.send("Removed (" + pastesToDelete.length + "): " + JSON.stringify(pastesToDelete));
        }
        catch (err) {
            yield client.query("ROLLBACK;");
            console.error(err);
            res.status(500).send((0, ServerResponse_1.ServerResponse)(false, ServerResponse_1.DefaultResponses.SERVER_ERROR));
        }
        client.release();
    });
}
