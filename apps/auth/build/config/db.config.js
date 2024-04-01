"use strict";
exports.__esModule = true;
exports.config = void 0;
var process_1 = require("process");
var config = {
    host: process_1.env.PG_HOST,
    port: parseInt(process_1.env.PG_PORT),
    user: process_1.env.POSTGRES_USER,
    password: process_1.env.POSTGRES_PASSWORD,
    database: process_1.env.PG_DB_NAME
};
exports.config = config;
