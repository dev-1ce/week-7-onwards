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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.userRouter.use(express.json());
function userCreation(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
        const id = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (id) {
            return "user exists";
        }
        const res = yield prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        return "user created";
    });
}
function userFind(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        const user = yield prisma.user.findFirst({
            where: {
                email,
            }
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
    res.send(yield userCreation(req.body));
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield userFind(req.body));
}));
