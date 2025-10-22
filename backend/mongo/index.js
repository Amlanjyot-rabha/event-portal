import mongoose from "mongoose";
 
  const connectDB= async()=>{
   
    try {
         await mongoose.connect(`${process.env.MONGODBLINK}event_portal`)
         console.log('database is connected successfully')
    } catch (error) {
        console.log('database is not connected')
    }

    
}

export default connectDB