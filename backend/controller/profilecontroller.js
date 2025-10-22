import jwt from "jsonwebtoken"
import eventModel from "../model/event.js"
import catchErrorhandel from "../errorhandeler/catchErrorHandeler.js"
const modifyEvent= catchErrorhandel(async(req,res)=>{
             const token = req.headers.authorization?.split(" ")[1];
             const decodedToken= jwt.verify(token,process.env.REFRESH_TOKEN)
             const userId=decodedToken.id 
             const eventData=await eventModel.find({userId:userId})
             res.json({success:true,message:eventData})
     }
)

const editPost= catchErrorhandel(async(req,res)=>{
       const {id,date,time}=req.body
       await eventModel.findByIdAndUpdate(id,{date,time})
       await  res.json({success:true,message:'update successfull'})
})


  
export {modifyEvent,editPost}
 