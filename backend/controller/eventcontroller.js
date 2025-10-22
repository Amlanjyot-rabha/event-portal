 import catchErrorhandel from "../errorhandeler/catchErrorHandeler.js"
import eventModel from "../model/event.js"
import Stripe from "stripe"
import jwt from 'jsonwebtoken'
import userModel from "../model/users.js"
const stripe= new Stripe(process.env.STRIPE_SECRET)
 const eventPost= catchErrorhandel(async(req,res)=>{
  
    let frontend_url='https://event-portal-frontend.onrender.com'
    const data=  req.body
    const imgUrl=req.file
    const token = req.body.token
    if(!token){
      res.json({success:false,message:'token not available'})
    }
    const decoded=jwt.verify(token,process.env.REFRESH_TOKEN)
    const userId=decoded.id
     
      const newEvent= await eventModel.create({
      userId,
      imageUrl:imgUrl.path,
      eventName:data.eventName,
      discription:data.discription,
      state:data.state,
      city:data.city,
      organizerName:data.organizerName,
      date:data.date,
      time:data.time,
      Email:data.Email,
      category:data.category,
      status:"pending"
    })


    const line_items={
      price_data:{
            currency:'inr',
           product_data:{
             name:data.eventName
            },
            unit_amount:300*100,
      },
       quantity: 1
    }

        const session =await stripe.checkout.sessions.create({
        line_items:[line_items],
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&session_id={{CHECKOUT_SESSION_ID}}&event_id=${newEvent._id}`,
        cancel_url:`${frontend_url}/verify?success=false`,
    })
 
      res.json({success:true,session_url:session.url})
  

 }) 


 const verify= catchErrorhandel(async(req,res)=>{
  const{session_url,event_id}=req.body
  if(session_url==="true"){
    await eventModel.findByIdAndUpdate(event_id,{status:"paid"})
    res.json({success:session_url,message:event_id})
  }else{
    console.error(error)
  }
  

 })
 

 const eventList=catchErrorhandel(async(req,res)=>{
     const listOfEvent=await eventModel.find()
     res.json({success:true,data:listOfEvent})
 })

 const deleteEvent=catchErrorhandel(async(req,res)=>{
 
  const {id}=req.body
  await eventModel.findByIdAndDelete(id)
  if(!id){
   res.json({success:true,message:'not found'})
  }else{
     res.json({success:true,message:'successfully delted'})
  }
    
 })
export  {eventPost,eventList,verify,deleteEvent}



