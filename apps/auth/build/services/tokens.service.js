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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = authToken;
exports.generateGuestKey = generateGuestKey;
exports.generatePermaKey = generatePermaKey;
exports.generateTempKey = generateTempKey;
var jwt = __importStar(require("jsonwebtoken"));
var jwt_config_1 = require("../config/jwt.config");
var Tokens_interface_1 = require("../models/Tokens.interface");
var db = __importStar(require("../services/db.service"));
var GenerateUUID_1 = __importDefault(require("../utils/GenerateUUID"));
function authToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, userId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    payload = jwt.decode(token);
                    _a = payload.type;
                    switch (_a) {
                        case Tokens_interface_1.TokenTypes.PERMA: return [3 /*break*/, 1];
                        case Tokens_interface_1.TokenTypes.GUEST: return [3 /*break*/, 3];
                        case Tokens_interface_1.TokenTypes.TMP: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, authPermaToken(token)];
                case 2:
                    userId = _b.sent();
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, authGuestToken(token)];
                case 4:
                    userId = _b.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, authTempToken(token)];
                case 6:
                    userId = _b.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, { userId: userId, accountType: payload.type }];
            }
        });
    });
}
function authPermaToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, dbToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = jwt.decode(token);
                    return [4 /*yield*/, db.query("SELECT perma_token_id FROM users WHERE id = $1;", [payload.u_id])];
                case 1:
                    dbToken = (_a.sent()).rows[0].perma_token_id;
                    jwt.verify(token, jwt_config_1.config.secretKey, { jwtid: dbToken.toString() });
                    return [2 /*return*/, payload.u_id];
            }
        });
    });
}
function authGuestToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            jwt.verify(token, jwt_config_1.config.secretKey);
            return [2 /*return*/, 0];
        });
    });
}
function authTempToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var payload;
        return __generator(this, function (_a) {
            payload = jwt.decode(token);
            jwt.verify(token, jwt_config_1.config.secretKey);
            return [2 /*return*/, payload.u_id];
        });
    });
}
function generatePermaKey(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var dbRes, currentId, newId, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query("SELECT perma_token_id FROM users WHERE id = $1", [userId])];
                case 1:
                    dbRes = (_a.sent());
                    if (!(dbRes.rowCount == 0)) return [3 /*break*/, 2];
                    throw new Error("invalid user");
                case 2:
                    currentId = dbRes.rows[0].perma_token_id !== null ? dbRes.rows[0].perma_token_id : -1;
                    return [4 /*yield*/, db.safeQuery("UPDATE users SET perma_token_id = $1 WHERE users.id = $2 RETURNING perma_token_id;", [currentId + 1, userId])];
                case 3:
                    newId = (_a.sent()).rows[0].perma_token_id;
                    payload = {
                        type: Tokens_interface_1.TokenTypes.PERMA,
                        u_id: userId
                    };
                    return [2 /*return*/, jwt.sign(payload, jwt_config_1.config.secretKey, { jwtid: newId.toString() })];
            }
        });
    });
}
function generateTempKey(userId) {
    var payload = {
        type: Tokens_interface_1.TokenTypes.TMP,
        u_id: userId
    };
    return jwt.sign(payload, jwt_config_1.config.secretKey, { expiresIn: "7d" });
}
function generateGuestKey(ip) {
    var payload = {
        type: Tokens_interface_1.TokenTypes.GUEST
    };
    var tokenId = ip + "-" + (0, GenerateUUID_1.default)(5);
    return jwt.sign(payload, jwt_config_1.config.secretKey, { jwtid: tokenId });
}
