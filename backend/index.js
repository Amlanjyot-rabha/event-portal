import express from 'express'
import 'dotenv/config'
import connectDB from './mongo/index.js'
import userRouter from './router/userrouter.js'
import cors from 'cors'
import { errorMiddleware } from './errorhandeler/errorhandler.js'
import postRouter from './router/post.js'
import cookieParser from 'cookie-parser'
import editEvent from './router/editevent.js'
const app =express()
const port = 4000
app.use(express.json())
app.use(cors({
   origin:"http://localhost:5173",
   credentials: true   
}))

app.use(cookieParser())
connectDB()
app.get('/',(req,res)=>{
res.send('app is working')
})

 
app.use('/api/users',userRouter)
app.use('/api/eventpost',postRouter)
app.use('/api/modifyevent',editEvent)

app.listen(port,()=>{
   console.log(`app is running on ${port}`)
})

app.use(errorMiddleware)