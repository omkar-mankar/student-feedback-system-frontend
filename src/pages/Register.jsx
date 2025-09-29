import { useState } from 'react'
import axios from 'axios'
import '../styles/Register.css'

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://127.0.0.1:5000/register', form)
      alert(res.data.message)
      // Clear form after successful registration
      setForm({ username: '', email: '', password: '', role: 'student' })
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed!')
    }
  }

  return (
    <div className='register-container'>
      <div className='register-card'>
        <h2>Register</h2>
        <p>Create your account to submit feedback and access your courses.</p>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Optional role selector, hidden for students */}
          {/* <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select> */}

          <button type='submit'>Register</button>
        </form>
        <div className='footer'>
          Already have an account? <a href='/login'>Login here</a>
        </div>
      </div>
    </div>
  )
}

export default Register

// import { useState } from "react";
// import axios from "axios";
// import "../styles/Register.css";

// function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://127.0.0.1:5000/register", form);
//       alert(res.data.message);
//     } catch (err) {
//       alert(err.response?.data?.error || "Registration failed!");
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Username</label>
//           <input type="text" name="username" value={form.username} onChange={handleChange} required />

//           <label>Email</label>
//           <input type="email" name="email" value={form.email} onChange={handleChange} required />

//           <label>Password</label>
//           <input type="password" name="password" value={form.password} onChange={handleChange} required />

//           {/* <label>Role</label>
//           <select name="role" value={form.role} onChange={handleChange}>
//             <option value="student">Student</option>
//             <option value="admin">Admin</option>
//           </select> */}

//           <button type="submit">Register</button>
//         </form>
//         <p>
//           Already have an account? <a href="/login">Login here</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;
