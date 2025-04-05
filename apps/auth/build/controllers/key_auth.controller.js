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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
exports.generate = generate;
var Tokens_interface_1 = require("../models/Tokens.interface");
var tokens_service_1 = require("../services/tokens.service");
function getRequestToken(req) {
    if (req.headers["authorization"]) {
        var frags = req.headers["authorization"].split(" ");
        if (frags.length != 2 || frags[0] !== "ApiKey")
            return undefined;
        return frags[1];
    }
    else if (req.cookies["quickpaste_auth"]) {
        return req.cookies["quickpaste_auth"];
    }
    return undefined;
}
function auth(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var key, userId, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getRequestToken(req);
                    if (key == undefined) {
                        res.status(401).end();
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, tokens_service_1.authToken)(key)];
                case 2:
                    userId = (_a.sent()).userId;
                    res.setHeader("Authorization", userId).end();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.status(403).end();
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function generate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var header, tempToken, _a, userId, accountType, permaToken, err_2, err_3, ip, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    header = req.headers["authorization"];
                    if (!header) return [3 /*break*/, 11];
                    tempToken = header.split(" ")[1];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, (0, tokens_service_1.authToken)(tempToken)];
                case 2:
                    _a = _b.sent(), userId = _a.userId, accountType = _a.accountType;
                    if (!(accountType === Tokens_interface_1.TokenTypes.TMP)) return [3 /*break*/, 7];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (0, tokens_service_1.generatePermaKey)(userId)];
                case 4:
                    permaToken = _b.sent();
                    res.send({ ok: true, result: permaToken });
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _b.sent();
                    res.status(500).send({ ok: false, result: "Internal server error" });
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    res.status(401).end();
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_3 = _b.sent();
                    res.status(401).send({ ok: false, result: "Invalid api key" });
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    key = (0, tokens_service_1.generateGuestKey)(ip);
                    res.send({ ok: true, result: key });
                    _b.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
