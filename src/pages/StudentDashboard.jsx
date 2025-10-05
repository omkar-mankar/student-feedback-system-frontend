import React, { useEffect, useState } from 'react'
import './StudentDashboard.css'

function StudentDashboard() {
  const [student, setStudent] = useState(null)
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const token = localStorage.getItem('token')

  // Fetch student info
  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch('http://127.0.0.1:5000/students/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setStudent(data)

      if (data?.courses?.length) {
        setCourses(data.courses)
      }
    }
    fetchStudent()
  }, [token])

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCourse) return

    const res = await fetch('http://127.0.0.1:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        course_id: selectedCourse._id,
        rating,
        comment,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage('Feedback submitted successfully!')
      setRating('')
      setComment('')
    } else {
      setMessage(data.error || 'Error submitting feedback')
    }
  }

  return (
    <div className='dashboard-container'>
      {student && <h2 className='welcome-msg'>Welcome, {student.username}!</h2>}

      <h3>Your Courses:</h3>
      {courses.length === 0 && <p>No courses assigned yet.</p>}
      <ul className='course-list'>
        {courses.map((course) => (
          <li
            key={course._id}
            onClick={() => setSelectedCourse(course)}
          >
            {course.course_name} - {course.semester}
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className='feedback-form-container'>
          <h3>Feedback for {selectedCourse.course_name}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Rating (1-5):
              <input
                type='number'
                min='1'
                max='5'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <button
              type='submit'
              className='submit-btn'
            >
              Submit Feedback
            </button>
          </form>
          {message && <p className='feedback-message'>{message}</p>}
        </div>
      )}
    </div>
  )
}

export default StudentDashboard

// import React, { useEffect, useState } from 'react'
// import '../styles/StudentDashboard.css'

// function StudentDashboard() {
//   const [student, setStudent] = useState(null)
//   const [courses, setCourses] = useState([])
//   const [selectedCourse, setSelectedCourse] = useState(null)
//   const [rating, setRating] = useState('')
//   const [comment, setComment] = useState('')
//   const [message, setMessage] = useState('')

//   const token = localStorage.getItem('token')

//   // Fetch student info
//   useEffect(() => {
//     const fetchStudent = async () => {
//       const res = await fetch('http://127.0.0.1:5000/students/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await res.json()
//       setStudent(data)

//       if (data?.courses?.length) {
//         setCourses(data.courses)
//       }
//     }
//     fetchStudent()
//   }, [token])

//   // Submit feedback
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!selectedCourse) return

//     const res = await fetch('http://127.0.0.1:5000/feedback', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         course_id: selectedCourse._id,
//         rating,
//         comment,
//       }),
//     })

//     const data = await res.json()
//     if (res.ok) {
//       setMessage('Feedback submitted successfully!')
//       setRating('')
//       setComment('')
//     } else {
//       setMessage(data.error || 'Error submitting feedback')
//     }
//   }

//   return (
//     <div className='dashboard-container'>
//       {student && <h2 className='welcome-msg'>Welcome, {student.username}!</h2>}

//       <h3>Your Courses:</h3>
//       {courses.length === 0 && <p>No courses assigned yet.</p>}
//       <ul className='course-list'>
//         {courses.map((course) => (
//           <li
//             key={course._id}
//             onClick={() => setSelectedCourse(course)}
//           >
//             {course.course_name} - {course.semester}
//           </li>
//         ))}
//       </ul>

//       {selectedCourse && (
//         <div className='feedback-form-container'>
//           <h3>Feedback for {selectedCourse.course_name}</h3>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Rating (1-5):
//               <input
//                 type='number'
//                 min='1'
//                 max='5'
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Comment:
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//             </label>
//             <button
//               type='submit'
//               className='submit-btn'
//             >
//               Submit Feedback
//             </button>
//           </form>
//           {message && <p className='feedback-message'>{message}</p>}
//         </div>
//       )}
//     </div>
//   )
// }

// export default StudentDashboard
