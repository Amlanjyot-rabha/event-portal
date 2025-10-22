import React, { useEffect, useState, useContext } from 'react'
import './profile.css'
import axios from "axios"
import { storeContex } from '../../component/usecontext'
import Navbar from '../navbar/navbar'
import Footer from '../../component/Footer/Footer'
const Profile = () => {
  const[date,setDate]=useState()
  const[time,setTime]=useState()
  const [data,setData]=useState([])
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState(null)
   const {backendUrl}=useContext(storeContex)
   const fetchData = async() => {
     setIsLoading(true)
     try {
       let token = localStorage.getItem('token')
       const response = await axios.get(`${backendUrl}/api/modifyevent/modifyevent`, {
         headers: {
           Authorization: `bearer ${token}`
         }
       })
       
       if (response && response.data) {
         setData(response.data.message || [])
       }
     } catch (error) {
       console.error('Error fetching events:', error)
       setData([])
     } finally {
       setIsLoading(false)
     }
   }

   

    const sendEditedData= async(id)=>{
      event.preventDefault()
      const editForm=new FormData()
      editForm.append('date',date)
      editForm.append('time',time)
      editForm.append('id',id)
      
      try {
        const response = await axios.post(`${backendUrl}/api/modifyevent/editevent`, editForm)
        if (response.data.success) {
          setEditingId(null)
          setMessage({ type: 'success', text: 'Event updated successfully!' })
          fetchData()
          
 
          setTimeout(() => setMessage(null), 3000)
        }
      } catch (error) {
        console.error('Error updating event:', error)
        setMessage({ type: 'error', text: 'Failed to update event. Please try again.' })
        
       
        setTimeout(() => setMessage(null), 3000)
      }
    }    
   
    const deleteEvent = async(id) => {
      try {
        const response = await axios.post(`${backendUrl}/api/modifyevent/deleteevent`, {id})
        if (response.data.message) {
         
          setMessage({ type: 'success', text: 'Event deleted successfully!' })
          fetchData()
          
         
          setTimeout(() => setMessage(null), 3000)
        }
      } catch (error) {
        console.error('Error deleting event:', error)
        setMessage({ type: 'error', text: 'Failed to delete event. Please try again.' })
        
       
        setTimeout(() => setMessage(null), 3000)
      }
    }


   useEffect(()=>{
      fetchData()
   },[])

  
  
  return (
    <>
      <Navbar />
      <div className='profile-container'>
        <div className='profile-header'>
          <h1>My <span className='text-gradient'>Events</span></h1>
          <p>Manage your events</p>
          
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
        
        <div className='events-container'>
           {isLoading ? (
             <div className='loading-spinner'>
               <div className='spinner'></div>
               <p>Loading your events...</p>
             </div>
           ) : data.length > 0 ? (
             data.map((item, index) => {
              let [hours, minutes] = item.time.split(":");
              hours = parseInt(hours);
              const ampm = hours >= 12 ? "PM" : "AM";
              hours = hours % 12 || 12;  
              const formattedTime = `${hours}:${minutes} ${ampm}`;

              return (
                <div key={index} className='event-card'>
                  <div className='event-details'>
                    <h3 className='event-name'>{item.eventName}</h3>
                    <div className='event-meta'>
                      <span className='event-date'>
                        <i className='event-icon date-icon'></i>
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className='event-time'>
                        <i className='event-icon time-icon'></i>
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className='event-actions'>
                    <button 
                      className='edit-btn'
                      onClick={() => setEditingId(editingId === item._id ? null : item._id)}
                    >
                      {editingId === item._id ? 'Cancel' : 'Edit'}
                    </button>
                    
                    <button 
                      className='delete-btn'
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this event?')) {
                          deleteEvent(item._id)
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  
                  {editingId !== item._id ? null : (
                    <div className='edit-form'>
                      <h4>Update Event Details</h4>
                      <form onSubmit={() => sendEditedData(item._id)}>
                        <div className='form-group'>
                          <label htmlFor='date'>Date</label>
                          <input 
                            type="date" 
                            id="date"
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className='form-group'>
                          <label htmlFor='time'>Time</label>
                          <input 
                            type="time" 
                            id="time"
                            onChange={(e) => setTime(e.target.value)}
                            required
                          />
                        </div>
                        
                        <button type='submit' className='save-btn'>Save Changes</button>
                      </form>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className='no-events-container'>
              <div className='no-events-icon'>📅</div>
              <h3>No Events Found</h3>
              <p>You haven't created any events yet.</p>
              <p>Create an event from the main page to see it here.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
