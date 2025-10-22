import express from "express"
import {eventPost,eventList,verify} from "../controller/eventcontroller.js"
import { v2 as cloudinary} from 'cloudinary'
import multer from "multer" 
import {CloudinaryStorage} from 'multer-storage-cloudinary'
 

 
 cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
 })


const postRouter=express.Router()
const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
    folder: "event_images",  
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})
const upload=multer({storage:storage})
postRouter.post('/post', upload.single('image'),eventPost)
postRouter.get('/events',eventList)
postRouter.post('/verifying',verify)
 

export default postRouter