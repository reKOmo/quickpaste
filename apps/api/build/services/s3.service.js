"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFiles = exports.deleteFile = exports.retriveFile = exports.uploadFile = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var s3_config_1 = __importDefault(require("../config/s3.config"));
aws_sdk_1["default"].config.update({
    region: s3_config_1["default"].region,
    s3ForcePathStyle: true
});
var s3endpoint = new aws_sdk_1["default"].Endpoint(s3_config_1["default"].endpoint);
var S3 = new aws_sdk_1["default"].S3({ endpoint: s3endpoint });
function uploadFile(name, file) {
    var uploadConfig = {
        Bucket: s3_config_1["default"].bucketName,
        Key: name,
        Body: file
    };
    return new Promise(function (resolve, reject) {
        S3.upload(uploadConfig, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.uploadFile = uploadFile;
function retriveFile(name) {
    var requestConfig = {
        Bucket: s3_config_1["default"].bucketName,
        Key: name
    };
    return new Promise(function (resolve, reject) {
        S3.getObject(requestConfig, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.retriveFile = retriveFile;
function deleteFile(name) {
    var requestConfig = {
        Bucket: s3_config_1["default"].bucketName,
        Key: name
    };
    return new Promise(function (resolve, reject) {
        S3.deleteObject(requestConfig, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.deleteFile = deleteFile;
function deleteFiles(names) {
    var requestConfig = {
        Bucket: s3_config_1["default"].bucketName,
        Delete: {
            Objects: names.map(function (n) { return ({ Key: n }); })
        }
    };
    return new Promise(function (resolve, reject) {
        S3.deleteObjects(requestConfig, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.deleteFiles = deleteFiles;
