const express = require("express");
export const userRouter = express();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "harkirat";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

userRouter.use(express.json());


function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
}

userRouter.post("/signup", async (req: any, res: any) => {
  const { email, name, password } = req.body;
  const id = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (id) {
    res.send("user exists");
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  const userID = user.id;
  const token = jwt.sign(
    {
      userID,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

userRouter.post("/signin", async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
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
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

userRouter.get("/verify", authenticateToken, (req: any, res: any) => {
  res.json({ message: "This is a protected route" });
});
