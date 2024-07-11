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
exports.userRouter = void 0;
const express = require("express");
exports.userRouter = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harkirat";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.userRouter.use(express.json());
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (!token)
        return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
}
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    const id = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (id) {
        res.send("user exists");
    }
    const user = yield prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });
    const userID = user.id;
    const token = jwt.sign({
        userID,
    }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token,
    });
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        res.json({
            msg: "User not found",
        });
        return;
    }
    if (user.password !== password) {
        res.json({
            msg: "incorrect Password",
        });
        return;
    }
    if (user) {
        const token = jwt.sign({
            userId: user.id,
        }, JWT_SECRET);
        res.json({
            token: token,
        });
        return;
    }
    res.status(411).json({
        message: "Error while logging in",
    });
}));
exports.userRouter.get("/verify", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route" });
});
