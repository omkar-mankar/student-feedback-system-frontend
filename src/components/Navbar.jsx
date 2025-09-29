import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const token = localStorage.getItem('token')

  return (
    <nav className='navbar'>
      <div className='nav-logo'>Student Feedback System</div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        {token && (
          <li>
            <Link to='/feedback'>Feedback</Link>
          </li>
        )}
        {!token && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
        {!token && (
          <li>
            <Link to='/register'>Register</Link>
          </li>
        )}
        {token && (
          <li>
            <button
              className='logout-btn'
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
      <div
        className='hamburger'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar
