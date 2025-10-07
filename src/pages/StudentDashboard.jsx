import React, { useEffect, useState } from 'react'
import '../styles/StudentDashboard.css'
import StudentFeedback from './StudentFeedback'

function StudentDashboard() {
  const [student, setStudent] = useState(null)
  const [courses, setCourses] = useState([])
  const [feedbacks, setFeedbacks] = useState([]) // store existing feedback
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('courses') // Default tab

  const token = localStorage.getItem('token')
  let messageTimeout = null // track timeout

  useEffect(() => {
    const fetchStudentAndFeedback = async () => {
      try {
        setLoading(true)
        // fetch student
        const resStudent = await fetch('http://127.0.0.1:5000/students/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!resStudent.ok) throw new Error('Failed to fetch student info')
        const data = await resStudent.json()
        setStudent(data)
        setCourses(data?.courses || [])

        // fetch student feedback
        const resFeedback = await fetch(
          'http://127.0.0.1:5000/feedback/student',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (!resFeedback.ok) throw new Error('Failed to fetch feedback')
        const feedbackData = await resFeedback.json()
        setFeedbacks(feedbackData)
      } catch (err) {
        console.error(err)
        showMessage('❌ Error fetching student data. Please log in again.')
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchStudentAndFeedback()

    // cleanup
    return () => clearTimeout(messageTimeout)
  }, [token])

  const showMessage = (msg) => {
    setMessage(msg)
    clearTimeout(messageTimeout)
    messageTimeout = setTimeout(() => setMessage(''), 3000)
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    // check if feedback exists
    const existing = feedbacks.find((f) => f.course_id === course._id)
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
    if (!selectedCourse) return

    try {
      setSubmitting(true)
      const res = await fetch('http://127.0.0.1:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_id: selectedCourse._id,
          rating: Number(rating),
          comment,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        showMessage('✅ Feedback submitted successfully!')
        // update local feedbacks state
        setFeedbacks((prev) => {
          const existing = prev.find((f) => f.course_id === selectedCourse._id)
          if (existing) {
            return prev.map((f) =>
              f.course_id === selectedCourse._id
                ? { ...f, rating: Number(rating), comment }
                : f
            )
          } else {
            return [
              ...prev,
              {
                course_id: selectedCourse._id,
                rating: Number(rating),
                comment,
              },
            ]
          }
        })
      } else {
        showMessage(`❌ ${data.error || 'Error submitting feedback'}`)
      }
    } catch (err) {
      console.error(err)
      showMessage('❌ Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return <div className='dashboard-container'>Loading student data...</div>

  return (
    <div className='dashboard-container'>
      {student && <h2 className='welcome-msg'>Welcome, {student.username}!</h2>}

      <div className='student-tabs'>
        <button
          className={activeTab === 'courses' ? 'active-tab' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Enrolled Courses
        </button>
        <button
          className={activeTab === 'feedback' ? 'active-tab' : ''}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>

      <div className='tab-content'>
        {activeTab === 'courses' && (
          <div className='dashboard-layout'>
            <div className='courses-sidebar'>
              {courses.length === 0 ? (
                <p>No courses assigned yet.</p>
              ) : (
                <ul className='course-list'>
                  {courses.map((course) => (
                    <li
                      key={course._id}
                      className={
                        selectedCourse?._id === course._id
                          ? 'active-course'
                          : ''
                      }
                      onClick={() => handleCourseSelect(course)}
                    >
                      <strong>{course.course_name}</strong>
                      <br />
                      Semester {course.semester}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className='center-panel'>
              {selectedCourse ? (
                <div className='feedback-form-container'>
                  <h3>Feedback for {selectedCourse.course_name}</h3>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Rating (1–5):
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
                        placeholder='Share your thoughts about the course...'
                      />
                    </label>

                    <button
                      type='submit'
                      className='submit-btn'
                      disabled={submitting}
                    >
                      {submitting
                        ? 'Submitting...'
                        : feedbacks.find(
                            (f) => f.course_id === selectedCourse._id
                          )
                        ? 'Update Feedback'
                        : 'Submit Feedback'}
                    </button>
                  </form>

                  {message && <p className='feedback-message'>{message}</p>}
                </div>
              ) : (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                  Select a course to submit feedback.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <StudentFeedback
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
          />
        )}
      </div>
    </div>
  )
}

export default StudentDashboard
