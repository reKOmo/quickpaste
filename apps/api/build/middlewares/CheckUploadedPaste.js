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
var _a;
exports.__esModule = true;
exports.checkUploadPaste = void 0;
var joi_1 = __importDefault(require("joi"));
var ServerResponse_1 = require("../utils/ServerResponse");
var quickpaste_constants_1 = __importDefault(require("quickpaste-constants"));
var userPasteFragment = joi_1["default"].object({
    name: joi_1["default"].string()
        .max(50)
        .required(),
    syntax: (_a = joi_1["default"].string()).allow.apply(_a, quickpaste_constants_1["default"].SUPPORTED_SYNTAXES)["default"]("text").required(),
    content: joi_1["default"].string().required()
});
var userPaste = joi_1["default"].object({
    title: joi_1["default"].string()
        .min(1)
        .max(50)
        .required(),
    fragments: joi_1["default"].array()
        .min(1)
        .max(500)
        .items(userPasteFragment)
        .sparse(false)
        .required(),
    password: joi_1["default"].string().allow(""),
    isPrivate: joi_1["default"].boolean()["default"](false)
});
function checkUploadPaste(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var validPaste;
        return __generator(this, function (_b) {
            validPaste = userPaste.validate(req.body);
            if (validPaste.error) {
                res.status(400).send((0, ServerResponse_1.ServerResponse)(false, validPaste.error.details[0].message));
                return [2 /*return*/];
            }
            if (req.additional.user === 0) {
                if (validPaste.value.isPrivate != false) {
                    res.status(400).send((0, ServerResponse_1.ServerResponse)(false, "Private pastes are only for logged in users"));
                    return [2 /*return*/];
                }
                if (validPaste.value.fragments.length > quickpaste_constants_1["default"].PASTE.FRAGMENT_LIMITS.guest) {
                    res.status(400).send((0, ServerResponse_1.ServerResponse)(false, "'fragments' length can not be longer than " + quickpaste_constants_1["default"].PASTE.FRAGMENT_LIMITS.guest));
                    return [2 /*return*/];
                }
            }
            //if password is empty set to undefined
            if (((_a = validPaste.value.password) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                validPaste.value.password = undefined;
            }
            req.additional["uploadedPaste"] = validPaste.value;
            next();
            return [2 /*return*/];
        });
    });
}
exports.checkUploadPaste = checkUploadPaste;
