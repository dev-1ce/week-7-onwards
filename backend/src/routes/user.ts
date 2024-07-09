const express = require("express");
export const userRouter = express();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface User {
    name:string,
    email:string,
    password:string,
}

userRouter.use(express.json())

async function userCreation({name,email,password}:User){
    const id = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if(id){
        return "user exists"
    }
    const res = await prisma.user.create({
        data: {
          name,
          email,
          password
        }
    });
    return "user created"
}

async function userFind({email,password}:User){
    const user = await prisma.user.findFirst({
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
}

userRouter.post("/signup",async (req:any,res:any)=>{
    res.send(await userCreation(req.body))
})

userRouter.post("/signin",async (req:any,res:any)=>{
    res.send(await userFind(req.body))
})


