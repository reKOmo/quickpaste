import express from "express";
import { router } from "./routes/router";
import cors from "cors";
var app = express();
app.use(cors());
app.use(router);
app.listen(3000);
