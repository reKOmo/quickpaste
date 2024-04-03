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
exports.__esModule = true;
exports.deleteFiles = exports.deleteFile = exports.retriveFile = exports.uploadFile = void 0;
var lib_storage_1 = require("@aws-sdk/lib-storage");
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_config_1 = __importDefault(require("../config/s3.config"));
var s3Client = new client_s3_1.S3Client({
    region: s3_config_1["default"].region,
    credentials: {
        secretAccessKey: s3_config_1["default"].secretKey,
        accessKeyId: s3_config_1["default"].accessKey
    },
    endpoint: s3_config_1["default"].endpoint,
    forcePathStyle: true
});
function uploadFile(name, file) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadConfig, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uploadConfig = {
                        Bucket: s3_config_1["default"].bucketName,
                        Key: name,
                        Body: file
                    };
                    return [4 /*yield*/, new lib_storage_1.Upload({
                            client: s3Client,
                            params: uploadConfig
                        }).done()];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, r];
            }
        });
    });
}
exports.uploadFile = uploadFile;
function retriveFile(name) {
    return __awaiter(this, void 0, void 0, function () {
        var requestConfig, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestConfig = new client_s3_1.GetObjectCommand({
                        Bucket: s3_config_1["default"].bucketName,
                        Key: name
                    });
                    return [4 /*yield*/, s3Client.send(requestConfig)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.retriveFile = retriveFile;
function deleteFile(name) {
    return __awaiter(this, void 0, void 0, function () {
        var requestConfig, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestConfig = new client_s3_1.DeleteObjectCommand({
                        Bucket: s3_config_1["default"].bucketName,
                        Key: name
                    });
                    return [4 /*yield*/, s3Client.send(requestConfig)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.deleteFile = deleteFile;
function deleteFiles(names) {
    return __awaiter(this, void 0, void 0, function () {
        var requestConfig, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestConfig = new client_s3_1.DeleteObjectsCommand({
                        Bucket: s3_config_1["default"].bucketName,
                        Delete: {
                            Objects: names.map(function (n) { return ({ Key: n }); })
                        }
                    });
                    return [4 /*yield*/, s3Client.send(requestConfig)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.deleteFiles = deleteFiles;
