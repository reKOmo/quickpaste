"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var process_1 = require("process");
var config = {
    secretKey: process_1.env.JWT_SECRET_KEY
};
exports.config = config;
