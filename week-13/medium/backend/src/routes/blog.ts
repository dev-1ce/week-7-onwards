import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlog,updateBlog } from "100xadarsh-common";

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
    }>()

blogRouter.use("/*", async (c,next)=>{
        const authheader = c.req.header("authorization")||"";
        const user = await verify(authheader,c.env.JWT_SECRET)
        if(user){
            c.set("userId",user.id);
            await next()
        }else {
            c.status(403);
            c.json({msg:"you are not logged in"})
        }
    })

blogRouter.post('/',async (c)=>{
    const body = await c.req.json();

    const {success} = createBlog.safeParse(body);
    if(!success){
    c.status(411)
    return c.json({msg:"wrong input"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
      const userId = c.get("userId")
      const blog  = await prisma.posts.create({
        data :{
            title:body.title,
            content:body.content,
            authorId:userId
        }
      })
    return c.json({id:blog.id})
  })
  
blogRouter.put('/',async(c)=>{
    const body = await c.req.json();

    const {success} = updateBlog.safeParse(body);
    if(!success){
    c.status(411)
    return c.json({msg:"wrong input"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const blog  = await prisma.posts.update({
        where:{
            id:body.id
        },
        data :{
            title:body.title,
            content:body.content,
            
        }
      })
    return c.json({id:blog.id})
  })

  blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blogs = await prisma.posts.findMany();

    return c.json({blogs})
  })
  
  
blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const id = await c.req.param("id");
      const blog  = await prisma.posts.findFirst({
        where:{
            id:id
        },
      })
    return c.json({blog})
  })
  
