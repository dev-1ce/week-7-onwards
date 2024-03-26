import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {

    const res = await prisma.user.findFirst({
        where:{
            username:username,
        },
    })
    console.log(res);
}

insertUser("admin1", "123456", "harkirat", "singh")