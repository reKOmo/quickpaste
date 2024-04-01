"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = require("./routes/router");
var app = (0, express_1["default"])();
app.use(router_1.router);
app.listen(3000);
