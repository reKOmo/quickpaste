"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const process_1 = require("process");
const config = {
    host: process_1.env.PG_HOST,
    port: parseInt(process_1.env.PG_PORT),
    user: process_1.env.POSTGRES_USER,
    password: process_1.env.POSTGRES_PASSWORD,
    database: process_1.env.PG_DB_NAME,
    ssl: process_1.env.NODE_ENV == "production"
};
exports.config = config;
