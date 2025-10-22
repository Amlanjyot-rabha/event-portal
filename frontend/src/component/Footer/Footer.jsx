import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='social-links'>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Twitter">TW</a>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">LI</a>
        </div>
        <p>© {new Date().getFullYear()} EventCollab. All rights reserved. Created by Amlanjyoti Rabha</p>
      </div>
    </div>
  )
}

export default Footer
