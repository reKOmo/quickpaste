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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
exports.safeQuery = safeQuery;
exports.getClient = getClient;
var pg_1 = require("pg");
var db_config_1 = require("../config/db.config");
var pool = new pg_1.Pool({
    user: db_config_1.config.user,
    password: db_config_1.config.password,
    host: db_config_1.config.host,
    port: db_config_1.config.port,
    database: db_config_1.config.database,
    ssl: db_config_1.config.ssl
});
function query(query, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.query(query, params)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function safeQuery(query, params) {
    return __awaiter(this, void 0, void 0, function () {
        var client, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, client.query("BEGIN")];
                case 3:
                    _a.sent();
                    res = client.query(query, params);
                    return [4 /*yield*/, client.query("COMMIT")];
                case 4:
                    _a.sent();
                    return [2 /*return*/, res];
                case 5:
                    err_1 = _a.sent();
                    return [4 /*yield*/, client.query("ROLLBACK")];
                case 6:
                    _a.sent();
                    throw err_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getClient() {
    return __awaiter(this, void 0, void 0, function () {
        var client, query, release, timeout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    query = client.query;
                    release = client.release;
                    timeout = setTimeout(function () {
                        console.error('A client has been checked out for more than 5 seconds!');
                        console.error("The last executed query on this client was: ".concat(client["lastQuery"]));
                    }, 5000);
                    // monkey patch the query method to keep track of the last query executed
                    client.query = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        client["lastQuery"] = args;
                        return query.apply(client, args);
                    };
                    client.release = function () {
                        // clear our timeout
                        clearTimeout(timeout);
                        // set the methods back to their old un-monkey-patched version
                        client.query = query;
                        client.release = release;
                        return release.apply(client);
                    };
                    return [2 /*return*/, client];
            }
        });
    });
}
