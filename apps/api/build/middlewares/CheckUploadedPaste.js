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
exports.checkUploadPaste = checkUploadPaste;
const joi_1 = __importDefault(require("joi"));
const ServerResponse_1 = require("../utils/ServerResponse");
const quickpaste_constants_1 = __importStar(require("quickpaste-constants"));
const userPasteFragment = joi_1.default.object({
    name: joi_1.default.string()
        .max(50)
        .required(),
    syntax: joi_1.default.string().allow(...quickpaste_constants_1.SUPPORTED_SYNTAXES).default("text").required(),
    content: joi_1.default.string().required()
});
const userPaste = joi_1.default.object({
    title: joi_1.default.string()
        .min(1)
        .max(50)
        .required(),
    fragments: joi_1.default.array()
        .min(1)
        .max(500)
        .items(userPasteFragment)
        .sparse(false)
        .required(),
    password: joi_1.default.string().allow(""),
    isPrivate: joi_1.default.boolean()
        .default(false)
});
function checkUploadPaste(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const validPaste = userPaste.validate(req.body);
        if (validPaste.error) {
            res.status(400).send((0, ServerResponse_1.ServerResponse)(false, validPaste.error.details[0].message));
            return;
        }
        if (req.additional.user === 0) {
            if (validPaste.value.isPrivate != false) {
                res.status(400).send((0, ServerResponse_1.ServerResponse)(false, "Private pastes are only for logged in users"));
                return;
            }
            if (validPaste.value.fragments.length > quickpaste_constants_1.default.PASTE.FRAGMENT_LIMITS.guest) {
                res.status(400).send((0, ServerResponse_1.ServerResponse)(false, "'fragments' length can not be longer than " + quickpaste_constants_1.default.PASTE.FRAGMENT_LIMITS.guest));
                return;
            }
        }
        //if password is empty set to undefined
        if (((_a = validPaste.value.password) === null || _a === void 0 ? void 0 : _a.length) == 0) {
            validPaste.value.password = undefined;
        }
        req.additional["uploadedPaste"] = validPaste.value;
        next();
    });
}
