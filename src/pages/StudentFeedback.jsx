// src\pages\StudentFeedback.jsx
import React, { useEffect, useState } from 'react'
import '../styles/StudentFeedback.css'

const StudentFeedback = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [myFeedbacks, setMyFeedbacks] = useState([])
  const token = localStorage.getItem('token')

  // Fetch courses and feedbacks
  useEffect(() => {
    fetch('http://127.0.0.1:5000/students/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses)
        localStorage.setItem('username', data.username)
      })
      .catch((err) => console.log(err))

    fetch('http://127.0.0.1:5000/feedback/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMyFeedbacks(data))
      .catch((err) => console.log(err))
  }, [])

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    const existing = myFeedbacks.find((f) => f.course_id === course._id)
    if (existing) {
      setRating(existing.rating)
      setComment(existing.comment)
    } else {
      setRating('')
      setComment('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCourse || !rating) return

    try {
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
      alert(data.message)

      // Refresh feedbacks
      const fbRes = await fetch('http://127.0.0.1:5000/feedback/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const fbData = await fbRes.json()
      setMyFeedbacks(fbData)

      const updatedFeedback = fbData.find(
        (f) => f.course_id === selectedCourse._id
      )
      if (updatedFeedback) {
        setRating(updatedFeedback.rating)
        setComment(updatedFeedback.comment)
      }
    } catch (err) {
      console.error('Error saving feedback:', err)
      alert('Something went wrong while saving feedback')
    }
  }

  const handleDelete = () => {
    if (!selectedCourse) return
    const existingFeedback = myFeedbacks.find(
      (f) => f.course_id === selectedCourse._id
    )
    if (!existingFeedback) return

    fetch(`http://127.0.0.1:5000/feedback/${existingFeedback._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message)
        setRating('')
        setComment('')
        setSelectedCourse(null)
        // Refresh feedbacks
        fetch('http://127.0.0.1:5000/feedback/my', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((fb) => setMyFeedbacks(fb))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='feedback-container'>
      <h2>Your Courses</h2>
      <div className='courses-list'>
        {courses.length === 0 ? (
          <p>No courses assigned yet.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className={`course-card ${
                selectedCourse?._id === course._id ? 'selected' : ''
              }`}
              onClick={() => handleCourseSelect(course)}
            >
              <h3>{course.course_name}</h3>
              <p>Instructor: {course.instructor}</p>
              <p>Semester: {course.semester}</p>
            </div>
          ))
        )}
      </div>

      {selectedCourse && (
        <form
          className='feedback-form'
          onSubmit={handleSubmit}
        >
          <h3>Feedback for {selectedCourse.course_name}</h3>
          <label>Rating (1-5):</label>
          <input
            type='number'
            value={rating}
            min='1'
            max='5'
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Optional'
          />
          <div className='feedback-buttons'>
            <button type='submit'>
              {myFeedbacks.find((f) => f.course_id === selectedCourse._id)
                ? 'Update Feedback'
                : 'Submit Feedback'}
            </button>

            {myFeedbacks.find((f) => f.course_id === selectedCourse._id) && (
              <button
                type='button'
                className='delete-btn'
                onClick={handleDelete}
              >
                Delete Feedback
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

export default StudentFeedback
