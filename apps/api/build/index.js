"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = require("./routes/router");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(router_1.router);
app.listen(3000);
