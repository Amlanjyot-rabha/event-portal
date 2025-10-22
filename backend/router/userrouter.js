import express from  'express'
import { login, userRegister } from '../controller/usercontroller.js'
// import userAuth from "../errorhandeler/authCheck.js"
const userRouter = express.Router()

userRouter.post('/register',userRegister)
userRouter.post('/login',login)


export default userRouter