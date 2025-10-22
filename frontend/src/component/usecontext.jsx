import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
export const storeContex=createContext()
const ContextProvider =   (props) => {
 const [token,setToken]=useState(null)
 const [eventList,setEventList]=useState([])
 

 const fatchData=async()=>{
     try {
      const response=await axios.get("http://localhost:4000/api/eventpost/events")
      if(response){
         setEventList(response.data.data)
      }
      else{
        console.log("data fatching failed")
      }
   } catch (error) {
    console.log(error)
   }
      
    }
      

  useEffect(()=>{
     fatchData()
  },[])
 let backendUrl ="http://localhost:4000"


  const contextValue={
      backendUrl ,
      token,
      setToken,
      eventList,
      setEventList
  }
    return (
    <storeContex.Provider value={contextValue}>
         {props.children}
    </storeContex.Provider>
  )
   
}

export default ContextProvider
