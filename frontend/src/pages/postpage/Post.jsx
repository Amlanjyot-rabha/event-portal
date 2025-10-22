import React, { useContext, useEffect, useState } from 'react'
// index.js or App.js
import 'nprogress/nprogress.css';
import './Post.css'
// import img from '../../assets/download.jpeg'
import uploadImg from '../../assets/upload1.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
 
 
const Post = () => {

 
  const navigate=useNavigate()
  const [img,setImg]=useState()
  const [postData,setPostData]=useState({
    eventName:'',
    discription:'',
    adress:{
      state:'',
      city:''
    },
    date:'',
    category:'',
    organizerName:'',
  })
   
  const handelSelect=(e)=>{
     const name=e.target.name 
     const value=e.target.value
     setPostData({...postData,[name]:value})
  }

   const submitData= async (e)=>{
    e.preventDefault()
    let form= new FormData(); 
    form.append('image',img)
    form.append('eventName',postData.eventName)
    form.append('discription',postData.discription)
    form.append('state',postData.adress.state)
    form.append('city',postData.adress.city)
    form.append('category',postData.category)
    form.append('organizerName',postData.organizerName)
    form.append('date',postData.date)
    form.append('time',postData.time)
    form.append('Email',postData.Email)
    form.append('token',localStorage.getItem('token'))
    const response =await axios.post("https://event-portal-9lgb.onrender.com/api/eventpost/post", form)
  if(response){
    window.location.replace(response.data.session_url)
  }
 
 

      
  
   }
   
   
  return (
    <div className='post-container'>
       <form onSubmit={submitData} >
         <label htmlFor="image" id='Email'>Contact Email</label>
         <input type="text" id='Email' placeholder='Contact Email' onChange={handelSelect} name='Email' value={postData.Email} required/>
        <label htmlFor="image" id='images'>click to choose image</label>
        <img src={img?URL.createObjectURL(img):uploadImg} alt="" required/>
        <input type="file" id='image' name='image' onChange={(e)=>{setImg(e.target.files[0])}} required/>
        <input type="text" placeholder='name of the event' onChange={handelSelect} name='eventName' value={postData.eventName} required/>
        <textarea  id="" name='discription' onChange={handelSelect} value={postData.discription}>description of the event</textarea>
        <div className='adress'>
            <label htmlFor="state">state</label>
            <input type="text" id='state' onChange={(e)=>setPostData({...postData,adress:{...postData.adress,state:e.target.value}})} placeholder='state' required/>
            <label htmlFor="city">city</label>
            <input type="text" id='city' onChange={(e)=>setPostData({...postData,adress:{...postData.adress,city:e.target.value}})} placeholder='city' required/>
        </div>
         
        <select name="category" onChange={handelSelect} value={postData.category} id="category" required >
               <option value="concert">Concert</option>
               <option value="webinar">Webinar</option>
               <option value="meetup">Meetup</option>
               <option value="sports">Sports Event</option>
               <option value="others">others</option>
        </select>
        <input type="text" onChange={handelSelect} placeholder='organizer name' name='organizerName' required  value={postData.organizerName}/>
        <input type="date" onChange={handelSelect} placeholder='date' name='date'  value={postData.date} required/>
        <input type="time" onChange={handelSelect} placeholder='Time ' name='time'  value={postData.time} required/>
        <button type='submit'>post</button>
       </form>
    </div>
  )
}

export default Post
