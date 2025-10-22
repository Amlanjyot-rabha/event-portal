import mongoose, { Schema } from "mongoose";

const eventSchema= new mongoose.Schema({
   imageUrl:{
      type:String
   },
   eventName:{
    type:String,
   },
   discription:{
    type:String,
   },
   state:{
    type:String,
   },
   city:{
    type:String,
   },
   category:{
    type:String,
   },
   organizerName:{
    type:String,
   },
  date:{
    type:Date,
   },
  time:{
    type:String,
   },
  status:{
    type:String,
   },
  userId:{
    type:String,
   },
  Email:{
    type:String,
   },

})

const eventModel=mongoose.models.events || mongoose.model('event',eventSchema)
export default  eventModel