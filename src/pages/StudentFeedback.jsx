import React, { useEffect, useState } from 'react'
import '../styles/StudentFeedback.css'

function StudentFeedback() {
  const [feedbacks, setFeedbacks] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/feedback/student', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setFeedbacks(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='student-feedback-container'>
      <h2>My Feedbacks</h2>
      {feedbacks.length > 0 ? (
        <div className='feedback-list'>
          {feedbacks.map((fb) => (
            <div
              className='feedback-item'
              key={fb._id}
            >
              <strong>{fb.course_name}</strong>
              <p>{fb.comment}</p>
              <small>Rating: {fb.rating || 'N/A'}</small>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          You have not submitted any feedback yet.
        </p>
      )}
    </div>
  )
}

export default StudentFeedback
