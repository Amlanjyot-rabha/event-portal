import React, { useState, useEffect, useContext } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { storeContex } from '../../component/usecontext'

const Navbar = () => {
  const {token, setToken} = useContext(storeContex)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = useNavigate()
  
  const toggleLoginbtn = () => {
    if(token) {
      localStorage.removeItem('token')
      setToken(null)
    } else {
      navigate('/login')
    }
    setMobileMenuOpen(false)
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const handleNavigation = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className='logo'>EVENTCOLLAB</div>
      
      <button className='mobile-menu-btn' onClick={toggleMobileMenu}>
        <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
            <li>About</li>
            <li onClick={toggleLoginbtn}>{token ? 'Logout' : 'Login'}</li>
            <li onClick={() => handleNavigation('/profile')}>Profile</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
