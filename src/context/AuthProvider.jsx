import React, { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: !!localStorage.getItem('token'),
    username: localStorage.getItem('username') || '',
    role: localStorage.getItem('role') || '',
  })

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        isLoggedIn: !!localStorage.getItem('token'),
        username: localStorage.getItem('username') || '',
        role: localStorage.getItem('role') || '',
      })
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const login = ({ token, username, role }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('role', role)
    setAuth({ isLoggedIn: true, username, role })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    setAuth({ isLoggedIn: false, username: '', role: '' })
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
