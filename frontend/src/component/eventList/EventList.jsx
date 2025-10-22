import React, { useEffect, useState } from 'react'
import './EventList.css'
import img from '../../assets/download.jpeg'
import { storeContex } from '../usecontext'
import { useContext } from 'react'
const EventList = () => {

 

  const {eventList}=useContext(storeContex)
  const [concertType,setConcertType]=useState("All")
  const [concertDate,setConcertDate]=useState()
  const [searchData,setSearchData]=useState(null)
  const [data,setData]=useState(false)
  const [show,setShow]=useState(true)
 
 

 

 useEffect(()=>{
 if(show===false){
  setShow(true)
 }
 },[concertType,concertDate])
 
 

  const FilterPost = () => {  
      const filteredEvents = eventList.filter(item => {
      const date = new Date(item.date);
      const date2 = concertDate ? new Date(concertDate) : null;
      return (
        item.status === 'paid' && 
        (!concertType || concertType === item.category || concertType === "All") &&
        (!concertDate || date <= date2)
      );
    });
      
     
       if(filteredEvents.length>0){
      setData(true)
   
    }
    
     


   if(data){
 
    if(filteredEvents.length===0){
   
      setShow(false)
    }
   }

   
    return (
      <div className="event-grid">
        {      
        filteredEvents.map((item, index) => {
          const date = new Date(item.date);
          const realDate = date.toLocaleDateString();

            const [hours, minutes] = item.time.split(":").map(Number);
             const ampm = hours >= 12 ? "PM" : "AM";
           const hours12 = hours % 12 || 12;
             const time12 = `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
          return (
            <div className="event-card" key={index}>
              <div className="images">
                <img src={item.imageUrl || img} alt={item.category} />
                <div className="event-category">{item.category}</div>
              </div>
              <div className="infos">
                <h5 className="event-id">{item.eventName}</h5>
                <h2 className="event-title">{item.category}</h2>
                <p className="event-date">{realDate}</p>
                <p className="event-date">{time12}</p>
                <p className="event-description">
                 {item.discription}</p>
                 
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.Email}&su=Interested%20in%20your%20event&body=Hi,%20I%20want%20to%20know%20more.`}><button className="contact-btn">Contact</button></a>
                   
              </div>
            </div>
          );
        })}
      </div>
    );
  }

 

  return (
    <div className='wrapper'>
      <div className='search-box'>
        <select 
          onChange={(e) => setConcertType(e.target.value)} 
          required
        >
          <option value="All">All Categories</option>
          <option value="webinar">Webinar</option>
          <option value="meetup">Meetup</option>
          <option value="sports">Sports Event</option>
        </select>
        <input 
          type="date" 
          onChange={(e) => setConcertDate(e.target.value)} 
          required
        />
      </div>
      
      
       { show?<FilterPost /> :  <div className="not-found-message">
          No events found matching your criteria. Try adjusting your filters.
        </div>
        
 }
    </div>
  )
}

export default EventList
