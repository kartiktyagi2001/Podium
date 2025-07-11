import { Hono } from 'hono'
import {decode, sign, verify} from 'hono/jwt'
import {cors} from 'hono/cors'

import {userRouter} from './routes/userRouter'
import {postRouter} from './routes/postRouter'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string // i googled this because "c.env..." causes error
  }
}>()


//cors
app.use('/*', cors())

//routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/post', postRouter);


export default app
