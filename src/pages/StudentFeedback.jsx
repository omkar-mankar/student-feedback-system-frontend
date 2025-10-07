import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import '../styles/StudentFeedback.css'

function StudentFeedback() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://127.0.0.1:5000/feedback/student', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setFeedbacks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?'))
      return

    try {
      const res = await fetch(`http://127.0.0.1:5000/feedback/${feedbackId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()
      if (res.ok) {
        setFeedbacks((prev) => prev.filter((fb) => fb._id !== feedbackId))
      } else {
        alert(data.error || 'Failed to delete feedback')
      }
    } catch (err) {
      console.error(err)
      alert('Network error. Please try again.')
    }
  }

  if (loading) return <p>Loading feedbacks...</p>

  return (
    <div className='feedback-center-panel'>
      <h3>My Feedbacks</h3>
      {feedbacks.length > 0 ? (
        <div className='feedback-list'>
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className='feedback-item'
            >
              <div className='feedback-content'>
                <strong>{fb.course_name}</strong>
                <p>{fb.comment}</p>
                <small>Rating: {fb.rating || 'N/A'}</small>
              </div>
              <div className='feedback-actions'>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(fb._id)}
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not submitted any feedback yet.</p>
      )}
    </div>
  )
}

export default StudentFeedback
