import React, { useEffect } from 'react'
import './Home.css'
import Navbar from '../navbar/navbar'
import { useNavigate } from 'react-router-dom'
import EventList from '../../component/eventList/EventList'
import Footer from '../../component/Footer/Footer'
import heroimg from '../../assets/hero.png'
const Home = () => {
  const navigate=useNavigate()
  const EventPostLandeler=()=>{
      navigate('/login')
  }

  const eventPost=()=>{
    let token = localStorage.getItem("token")
    if(token){
      navigate('/post')
      console.log(localStorage.getItem("token"))
    }
    else{
      navigate('/login')
    }
  }

 
  return (
    <>
      
    <div className='home-container'>
        <Navbar/>
    <div className='hero-container'>
        <div className='text'>
             <h1>Where Organizers <br /> Meet Sponsors</h1> <br />
             <p>We make partnerships easy by bringing event organizers and sponsors together in one place. Find the right support to bring your ideas on stage, attract bigger audiences, and create memorable experiences. No endless searching, no guesswork—just the right connections to fuel your event.</p>
  <br />
             <button onClick={eventPost}>post</button>
        </div>

        <div className='image'>
              <img src={heroimg } alt="" />
        </div>

    </div>
        
    
    </div>
    <EventList/>
    <Footer/>
    </>
     
  )
}

export default Home
