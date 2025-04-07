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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
exports.retriveFile = retriveFile;
exports.deleteFile = deleteFile;
exports.deleteFiles = deleteFiles;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_config_1 = __importDefault(require("../config/s3.config"));
const s3Client = new client_s3_1.S3Client({
    region: s3_config_1.default.region,
    credentials: {
        secretAccessKey: s3_config_1.default.secretKey,
        accessKeyId: s3_config_1.default.accessKey
    },
    endpoint: s3_config_1.default.endpoint,
    forcePathStyle: true
});
function uploadFile(name, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadConfig = {
            Bucket: s3_config_1.default.bucketName,
            Key: name,
            Body: file
        };
        const r = yield new lib_storage_1.Upload({
            client: s3Client,
            params: uploadConfig
        }).done();
        return r;
    });
}
function retriveFile(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestConfig = new client_s3_1.GetObjectCommand({
            Bucket: s3_config_1.default.bucketName,
            Key: name
        });
        //@ts-ignore
        const response = yield s3Client.send(requestConfig);
        return response;
    });
}
function deleteFile(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestConfig = new client_s3_1.DeleteObjectCommand({
            Bucket: s3_config_1.default.bucketName,
            Key: name
        });
        //@ts-ignore
        const response = yield s3Client.send(requestConfig);
        return response;
    });
}
function deleteFiles(names) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestConfig = new client_s3_1.DeleteObjectsCommand({
            Bucket: s3_config_1.default.bucketName,
            Delete: {
                Objects: names.map(n => ({ Key: n }))
            }
        });
        //@ts-ignore
        const response = yield s3Client.send(requestConfig);
        return response;
    });
}
