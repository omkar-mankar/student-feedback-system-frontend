import { useState } from 'react'
import axios from 'axios'
import '../styles/Auth.css'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [activeTab, setActiveTab] = useState('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  })
  const navigate = useNavigate()

  // Login handlers
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://127.0.0.1:5000/login', loginForm)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('username', res.data.username) // save username
      alert(res.data.message)
      navigate(res.data.role === 'admin' ? '/admin-dashboard' : '/home')
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed!')
    }
  }

  // Register handlers
  const handleRegisterChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:5000/register', {
        ...registerForm,
        role: 'student',
      })
      alert('Registration successful! Please login to continue.')
      setRegisterForm({
        username: '',
        email: '',
        password: '',
        role: 'student',
      })
      setActiveTab('login')
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed!')
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='tab-header'>
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            <button type='submit'>Login</button>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={registerForm.username}
              onChange={handleRegisterChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />

            <button type='submit'>Register</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Auth

// import { useState } from 'react'
// import axios from 'axios'
// import '../styles/Auth.css'
// import { useNavigate } from 'react-router-dom'

// function Auth() {
//   const [activeTab, setActiveTab] = useState('login')
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' })
//   const [registerForm, setRegisterForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'student',
//   })
//   const navigate = useNavigate()

//   // Login handlers
//   const handleLoginChange = (e) =>
//     setLoginForm({ ...loginForm, [e.target.name]: e.target.value })

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post('http://127.0.0.1:5000/login', loginForm)
//       localStorage.setItem('token', res.data.token)
//       localStorage.setItem('role', res.data.role)
//       localStorage.setItem('username', res.data.username) // save username
//       alert(res.data.message)
//       navigate(res.data.role === 'admin' ? '/admin-dashboard' : '/home')
//     } catch (err) {
//       alert(err.response?.data?.error || 'Login failed!')
//     }
//   }

//   // Register handlers
//   const handleRegisterChange = (e) =>
//     setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       await axios.post('http://127.0.0.1:5000/register', {
//         ...registerForm,
//         role: 'student',
//       })
//       alert('Registration successful! Please login to continue.')
//       setRegisterForm({
//         username: '',
//         email: '',
//         password: '',
//         role: 'student',
//       })
//       setActiveTab('login')
//     } catch (err) {
//       alert(err.response?.data?.error || 'Registration failed!')
//     }
//   }

//   return (
//     <div className='auth-container'>
//       <div className='auth-card'>
//         <div className='tab-header'>
//           <button
//             className={activeTab === 'login' ? 'active' : ''}
//             onClick={() => setActiveTab('login')}
//           >
//             Login
//           </button>
//           <button
//             className={activeTab === 'register' ? 'active' : ''}
//             onClick={() => setActiveTab('register')}
//           >
//             Register
//           </button>
//         </div>

//         {activeTab === 'login' && (
//           <form onSubmit={handleLoginSubmit}>
//             <input
//               type='email'
//               name='email'
//               placeholder='Email'
//               value={loginForm.email}
//               onChange={handleLoginChange}
//               required
//             />
//             <input
//               type='password'
//               name='password'
//               placeholder='Password'
//               value={loginForm.password}
//               onChange={handleLoginChange}
//               required
//             />
//             <button type='submit'>Login</button>
//           </form>
//         )}

//         {activeTab === 'register' && (
//           <form onSubmit={handleRegisterSubmit}>
//             <input
//               type='text'
//               name='username'
//               placeholder='Username'
//               value={registerForm.username}
//               onChange={handleRegisterChange}
//               required
//             />
//             <input
//               type='email'
//               name='email'
//               placeholder='Email'
//               value={registerForm.email}
//               onChange={handleRegisterChange}
//               required
//             />
//             <input
//               type='password'
//               name='password'
//               placeholder='Password'
//               value={registerForm.password}
//               onChange={handleRegisterChange}
//               required
//             />

//             <button type='submit'>Register</button>
//           </form>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Auth
