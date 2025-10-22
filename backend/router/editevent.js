import express from "express";
import { editPost, modifyEvent } from "../controller/profilecontroller.js";
import multer from "multer";
import { deleteEvent } from "../controller/eventcontroller.js";
const editEvent=express.Router()
const upload=multer()
editEvent.get('/modifyevent',modifyEvent)
editEvent.post('/editevent',upload.none(),editPost)
editEvent.post('/deleteevent',deleteEvent)

export default editEvent