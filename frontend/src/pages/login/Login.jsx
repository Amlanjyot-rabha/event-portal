import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Login.css'
import Post from '../postpage/Post'
import { useContext } from 'react'
import { storeContex } from '../../component/usecontext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate()
 
  const [logValue,setLogvalue]=useState('login')
  const [signinValue,setSigninValue]=useState({
    username:'',
    email:'',
    password:'',
  })
  
  const dataHandle=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setSigninValue({...signinValue,[name]:value})
  }

  const formSubmit= async()=>{
    event.preventDefault()
    try {
      if(logValue==='login'){
        const response =await axios.post("http://localhost:4000/api/users/login",signinValue)
        if(response){
        localStorage.setItem('token',response.data.refreshToken)
        setSigninValue("")
        navigate('/')
      } 
       } else{
        const response =await axios.post("http://localhost:4000/api/users/signin",signinValue )
        if(response){
        localStorage.setItem('token',response.data.refreshToken)
        setSigninValue("")
        navigate('/')
      } 
       }
       
  
    } catch (error) {
      alert(error)
    }

  }
 



  return (
    <>
          
        <div className='form-container'>
        <h2>Wellcome back</h2>
        <p>please enter you details</p>
        <div className='login-button'>
            <button onClick={()=>setLogvalue('login')}>Login</button>
            <button onClick={()=>setLogvalue('sign-in')}>Sign-in</button>
        </div>
      <form onSubmit={formSubmit}>
          {
           logValue==='login'?'':<input type="text" name='username'  onChange={dataHandle} value={signinValue.value} placeholder='User Name' required/>
          }
        <input type="email" placeholder='Email..' name='email' onChange={dataHandle} value={signinValue.value} required/>
        <input type="password" placeholder='password' name='password' onChange={dataHandle} value={signinValue.value} required/>
        <button type='submit'>continue</button>
      </form>
    </div>
 
    </>
  
  )
}

export default Login
