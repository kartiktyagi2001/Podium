import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'
import {signupValidation, signinValidation} from '@arcbit/podium-common'

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
        return c.json({
            message: "Inputs not correct"
        }, 411);
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
      jwt: token,
      name: user.name
    })  
    

  } catch(err){
    return c.status(403);
  }

  // return c.text("Hello!")
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
        return c.json({
            message: "Inputs not correct"
        }, 411);
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
    return c.json({jwt, name: user.name});

  } catch(err){
    return c.json({error: err});
  }

//   return c.text("Hello!")
})

//profile
userRouter.get('/profile', async (c) => {

  // const id = c.req.param("id");

  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const token = c.req.header('Authorization')?.split(' ')[1]; //removes bearer
    if (!token) {
        return c.json({ error: 'Unauthorized' });
    }

    try {
        const payload = await verify(token, c.env.JWT_SECRET) as { id: string }; //it verifies token and tells that it has id which is a string
        const userProfileData = await prisma.user.findUnique({
            where: { id: payload.id },
            include: { posts: true } //since prisma doesnot include relation w other tables by default, initially i was thinking that i make another db query to find posts using author id
        });
        if (!userProfileData) {
            return c.json({ error: 'User not found' });
        }
        return c.json({
          email: userProfileData.email,
          name: userProfileData.name,
          bio: userProfileData.bio,
          posts: userProfileData.posts.reverse()//reverse to send in lifo manner
        });
    } catch (err) {
        return c.json({ error: 'Invalid token' });
    }
});
