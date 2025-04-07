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
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
exports.safeQuery = safeQuery;
exports.getClient = getClient;
const pg_1 = require("pg");
const db_config_1 = require("../config/db.config");
const pool = new pg_1.Pool({
    user: db_config_1.config.user,
    password: db_config_1.config.password,
    host: db_config_1.config.host,
    port: db_config_1.config.port,
    database: db_config_1.config.database,
    ssl: db_config_1.config.ssl
});
function query(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pool.query(query, params);
    });
}
function safeQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN");
            const res = client.query(query, params);
            yield client.query("COMMIT");
            return res;
        }
        catch (err) {
            yield client.query("ROLLBACK");
            throw err;
        }
    });
}
function getClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        const query = client.query;
        const release = client.release;
        // set a timeout of 5 seconds, after which we will log this client's last query
        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!');
            console.error(`The last executed query on this client was: ${client["lastQuery"]}`);
        }, 5000);
        // monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
            client["lastQuery"] = args;
            return query.apply(client, args);
        };
        client.release = () => {
            // clear our timeout
            clearTimeout(timeout);
            // set the methods back to their old un-monkey-patched version
            client.query = query;
            client.release = release;
            return release.apply(client);
        };
        return client;
    });
}
