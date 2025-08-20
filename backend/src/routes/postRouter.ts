import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign} from 'hono/jwt'
import {auth} from '../middlewares/auth'

import {createValidation, updateValidation} from '@arcbit/podium-common'


export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string //i googled this because "c.env..." causes error
  },
  Variables: {
    user_id: string //again an error while accessing using c.get in create blog route
  }
}>();

//create blog
postRouter.post('/', auth, async (c) => {

    const body = await c.req.json() as { title: string; description: string; author_id: string };

    //schema validation
    const {success} = createValidation.safeParse(body)

    if(!success){
        return c.json({
            message: "Inputs not correct"
        }, 411);
    }

    const user_id = c.get("user_id");   //fetched user_id from auth middleware 

    // initialize prisma
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.create({
            data:{
                title: body.title,
                description: body.description,
                author_id: user_id //had problem here fetching id from middleware( solved using set and get)
            }
        });

        return c.json({
            id: blog.id
        })

    } catch(err){
        c.status(411);
        return c.json({error: err});
    }
})

//update blog
postRouter.put('/', auth, async (c) => {

    const body = await c.req.json() as { title: string; description: string; id: string };

    //schema validation
    const {success} = updateValidation.safeParse(body)

    if(!success){
        return c.json({
            message: "Inputs not correct"
        }, 411);
    }

    // initialize prisma
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data:{
                title: body.title,
                description: body.description,
            }
        });

        return c.json({
            blog
        })

    } catch(err){
        c.status(406);
        return c.json({error: err});
    }
})

// return all blogs
// but we need to add pagination so that blogs get in chunks not all at once, making init render faster
postRouter.get('/all', async (c) => {

    // initialize prisma
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const fetchedBlogs = await prisma.post.findMany({
            select:{
                id: true,
                title: true,
                description: true,
                author_id: true,
                author:{
                    select:{
                        name: true
                    }
                },
                created_at: true
            }
        });

        const blogs = fetchedBlogs.reverse(); //earlierblogs were in fcfs order, now they are in lifo, yay!

        return c.json({
            message: "here are the blogs",
            blogs
        });

    } catch(err){
        c.status(411);
        return c.json({error: err, message: "Error fetching blog"});
    }
})

// get a apecific blog
postRouter.get('/get/:id', async (c) => {  

    const id = await c.req.param("id");

    // initialize prisma
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findFirst({
            where: {
            id
            },
            select:{
                id: true,
                title: true,
                description: true,
                author:{
                    select:{
                        name: true
                    }
                },
                created_at: true
            }
        });

        return c.json({
            blog
        });

    } catch(err){
        c.status(411);
        return c.json({error: err, message: "Error fetching blog"});
    }
})

