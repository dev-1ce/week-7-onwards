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
function userFind(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        const user = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            return "user not found";
        }
        if (user.password !== password) {
            return "incorrect password";
        }
        return "user signed in";
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
    const { email, name, password } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        return "user not found";
    }
    if (user.password !== password) {
        return "incorrect password";
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
