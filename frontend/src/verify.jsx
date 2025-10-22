import React from "react";
import { MoonLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Verify = ()=>{
    const navigate=useNavigate()
const [getParams,setParams]=useSearchParams()
useEffect(async()=>{
   let session_url=getParams.get("success")
let event_id=getParams.get("event_id")
console.log("session_url,event_id")
const response = await axios.post('http://localhost:4000/api/eventpost/verifying',{session_url,event_id})
if(response.data.success){
    navigate('/')
}
})
 
  return (
    <>
    
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f9fafb", 
        flexDirection: "column",
      }}
    >
      <MoonLoader color="#36d7b7" size={80} speedMultiplier={1.2} />
      <p
        style={{
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "500",
          color: "#333",
        }}
      >
        Verifying your payment...
      </p>
    </div>
    </>
    
  );
};

export default Verify;


 
