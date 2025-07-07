import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'
import {signupValidation, signinValidation} from ''

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string // i googled this because "c.env..." causes error
  }
}>();

//signup route
userRouter.post('/signup', async (c) => {

    // initialize prisma
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    //schema validation
    const {success} = signupValidation.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message: "Inputs not correct"
        })
    }
    

  try{
    const user = await prisma.user.create({
      data:{
        email: body.email,
        name: body.name,
        password: body.password
      }
    });

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
      jwt: token
    })    
  } catch(err){
    return c.status(403);
  }

  return c.text("Hello!")
})

//signin
userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    //schema validation
    const {success} = signinValidation.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message: "Inputs not correct"
        })
    }

    try{
        const user = await prisma.user.findUnique({
        where:{
            email: body.email,
            password: body.password
        }
    });

    if(!user){
      c.status(403)
      return c.json({error: "User not found"})
    }

    const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({jwt});

  } catch(err){
    return c.json({error: err});
  }

//   return c.text("Hello!")
})

