"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const config = {
    region: process_1.env.AWS_REGION,
    bucketName: process_1.env.AWS_BUCKET_NAME,
    accessKey: process_1.env.AWS_ACCESS_KEY_ID,
    secretKey: process_1.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process_1.env.AWS_ENDPOINT
};
exports.default = config;
