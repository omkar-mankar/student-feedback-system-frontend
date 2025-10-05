import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaHome,
  FaBookOpen,
  FaUserShield,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa'
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const loadAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token')))
      setUsername(localStorage.getItem('username') || '')
      setRole(localStorage.getItem('role') || '')
    }

    loadAuth()
    window.addEventListener('authChanged', loadAuth)
    window.addEventListener('storage', loadAuth)

    return () => {
      window.removeEventListener('authChanged', loadAuth)
      window.removeEventListener('storage', loadAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    window.dispatchEvent(new Event('authChanged'))
    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <div
          className='nav-logo'
          onClick={() => navigate('/home')}
          role='button'
          tabIndex={0}
        >
          Student Feedback System
        </div>
      </div>

      {isLoggedIn && (
        <div className='nav-username-center'>
          Welcome, <span>{username}</span>!
        </div>
      )}

      <div className='nav-right'>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to='/home'
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className='nav-icon' /> Home
            </Link>
          </li>

          {isLoggedIn && role === 'student' && (
            <li>
              <Link
                to='/student-dashboard'
                onClick={() => setIsMenuOpen(false)}
              >
                <FaBookOpen className='nav-icon' /> Dashboard
              </Link>
            </li>
          )}

          {isLoggedIn && role === 'admin' && (
            <li>
              <Link
                to='/admin-dashboard'
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserShield className='nav-icon' /> Admin Dashboard
              </Link>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <button
                className='nav-btn login-btn'
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/login')
                }}
              >
                <FaSignInAlt className='nav-icon' /> Login
              </button>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button
                className='logout-btn'
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }}
              >
                <FaSignOutAlt className='nav-icon' /> Logout
              </button>
            </li>
          )}
        </ul>

        <div
          className='hamburger'
          onClick={() => setIsMenuOpen((s) => !s)}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
