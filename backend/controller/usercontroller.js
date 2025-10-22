import express from 'express'
import userModel from '../model/users.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import catchErrorhandel from '../errorhandeler/catchErrorHandeler.js'
import ErrorApi from '../errorhandeler/errorhandler.js'

  const generateToken=(id)=>{
             let  accessToken=jwt.sign({id},process.env.ACCESS_TOKEN,{expiresIn:'20m'})
               let  refreshToken=jwt.sign({id},process.env.REFRESH_TOKEN,{expiresIn:'7d'})
               return {refreshToken,accessToken}

  }

  const userRegister=catchErrorhandel( async(req,res,next)=>{
         const {email,password,username}=req.body
        if([email,password,username].some((field) => field?.trim() === "")){
          return next( new ErrorApi(400,'All fields are required'))
        }
  
        const usernameexit = await userModel.findOne({username})
          if(usernameexit){
          return next( new ErrorApi(400,'user name is already exist'))
        } 
        const emailexit = await userModel.findOne({email})
        if(emailexit){
          return res.json({success:false,message:"email is already exit"})
        }

        if(!validator.isEmail(email)){
          return res.json({success:false,message:'enter valid email'})
        }
 
        const salt = await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt)

      const newUser= new userModel({
        email:email,
        username:username,
        password:hashpassword
      })
       
      const user=await newUser.save()
      const  {accessToken,refreshToken}= generateToken(user._id)
      return res.cookie("accessToken",accessToken,{
          httpOnly:true,
          maxAge:20*60*1000
      }).json({success:true,refreshToken,message:"signin successfull"})
  })
 


    const login= catchErrorhandel( async (req,res,next)=>{
         const {email,password}=req.body
        //  res.json({token:req.cookies.accessToken})
      const user = await userModel.findOne({email})
      if(!user){
        res.json({success:false,message:'invalid email'})
      }
      const compare =await bcrypt.compare(password,user.password)
      if(!compare){
        res.json({success:false,message:'wrong password'})
      }
      const  {accessToken,refreshToken}= generateToken(user._id)
       return res.cookie("accessToken",accessToken,{
          httpOnly:true,
            secure: false, 
          maxAge:20*60*1000
      }).json({success:true,refreshToken,message:"login successfull"})
    })  
export  {userRegister,login}