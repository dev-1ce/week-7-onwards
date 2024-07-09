"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./routes/user");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use("/*", cors());
app.get("/api", (req, res) => {
    res.send("hello from api");
});
app.use("/api/v1/user", user_1.userRouter);
app.listen(5000);
