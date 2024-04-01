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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = void 0;
var joi_1 = __importDefault(require("joi"));
var db = __importStar(require("../services/db.service"));
var axios_1 = __importDefault(require("axios"));
var tokens_service_1 = require("../services/tokens.service");
var axios_retry_1 = __importDefault(require("axios-retry"));
var loginData = joi_1["default"].object({
    type: joi_1["default"].string().valid("github").required(),
    token: joi_1["default"].string().required()
});
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, data, token, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = req.body;
                    data = loginData.validate(body);
                    if (data.error) {
                        res.status(403).send({ ok: false, result: "Incorrect data format" });
                        return [2 /*return*/];
                    }
                    token = "";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    _a = data.value.type;
                    switch (_a) {
                        case "github": return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, loginGithub(data.value)];
                case 3:
                    token = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    res.status(500).send(err_1);
                    return [2 /*return*/];
                case 6:
                    res.send(token);
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function loginGithub(data) {
    return __awaiter(this, void 0, void 0, function () {
        var res, userData, username, userId, extId, internalData, internalId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, axios_retry_1["default"])(axios_1["default"], {
                        retries: 3
                    });
                    return [4 /*yield*/, (0, axios_1["default"])({
                            url: "https://api.github.com/user",
                            method: "GET",
                            headers: {
                                "Authorization": "token ".concat(data.token)
                            }
                        })];
                case 1:
                    res = _a.sent();
                    if (res.status !== 200) {
                        throw new Error("Failed to login with github");
                    }
                    return [4 /*yield*/, res.data];
                case 2:
                    userData = _a.sent();
                    username = userData.login;
                    userId = userData.id;
                    extId = data.type + "/" + JSON.stringify(userId);
                    return [4 /*yield*/, db.query("SELECT id FROM users WHERE ext_id = $1;", [extId])];
                case 3:
                    internalData = _a.sent();
                    internalId = -1;
                    if (!(internalData.rowCount == 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, createAccount(username, extId)];
                case 4:
                    // create account
                    internalId = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    internalId = internalData.rows[0].id;
                    _a.label = 6;
                case 6: 
                //TODO update data in db from github (like username)
                return [2 /*return*/, (0, tokens_service_1.generateTempKey)(internalId)];
            }
        });
    });
}
function createAccount(username, extId) {
    if (extId === void 0) { extId = null; }
    return __awaiter(this, void 0, void 0, function () {
        var res, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.safeQuery("INSERT INTO users (username, ext_id) VALUES ($1::character varying, $2::character varying) returning id;", [username, extId])];
                case 1:
                    res = _a.sent();
                    userId = res.rows[0].id;
                    return [2 /*return*/, userId];
            }
        });
    });
}
