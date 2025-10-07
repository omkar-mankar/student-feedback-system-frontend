import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import '../styles/AdminDashboard.css'

function AdminDashboard() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [selectedTab, setSelectedTab] = useState('students') // students / courses / feedback

  const [newCourse, setNewCourse] = useState({
    course_name: '',
    instructor: '',
    semester: '',
    description: '',
  })
  const [editingCourseId, setEditingCourseId] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchStudents()
    fetchCourses()
    if (selectedTab === 'feedback') fetchAllFeedbacks()
  }, [selectedTab])


  // Fetch Data---------------------------------------------

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setStudents(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/courses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setCourses(data)
    } catch (err) {
      console.error(err)
    }
  }


  // Feedback Logic (All Feedbacks)------------------------------

  const fetchAllFeedbacks = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/feedback/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setFeedbacks(data)
    } catch (err) {
      console.error(err)
      setFeedbacks([])
    }
  }


  // Student Assignment Logic-------------------------------------------
  
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    const assignedIds = student.courses?.map((c) => c._id) || []
    setSelectedCourses(assignedIds)
  }

  const handleCourseToggle = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  const [assigning, setAssigning] = useState(false)

  const handleAssignCourses = async () => {
    if (!selectedStudent) return
    setAssigning(true)
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/students/${selectedStudent._id}/assign-courses`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course_ids: selectedCourses }),
        }
      )
      const data = await res.json()
      alert(data.message)

      const studentsRes = await fetch('http://127.0.0.1:5000/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const updatedStudents = await studentsRes.json()
      setStudents(updatedStudents)

      const refreshedStudent = updatedStudents.find(
        (s) => s._id === selectedStudent._id
      )
      setSelectedStudent(refreshedStudent)
      setSelectedCourses(refreshedStudent?.courses?.map((c) => c._id) || [])
    } catch (err) {
      console.error(err)
      alert('Failed to assign courses')
    } finally {
      setAssigning(false)
    }
  }

 
  // Course Management Logic--------------------------------------
 
  const handleCourseChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value })
  }

  const handleAddOrEditCourse = async () => {
    const { course_name, semester } = newCourse
    if (!course_name || !semester) {
      alert('Course name and semester are required!')
      return
    }

    try {
      const url = editingCourseId
        ? `http://127.0.0.1:5000/courses/${editingCourseId}`
        : 'http://127.0.0.1:5000/courses'
      const method = editingCourseId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      })
      const data = await res.json()
      alert(data.message)
      setNewCourse({
        course_name: '',
        instructor: '',
        semester: '',
        description: '',
      })
      setEditingCourseId(null)
      fetchCourses()
    } catch (err) {
      console.error(err)
      alert('Failed to save course')
    }
  }

  const handleEditCourse = (course) => {
    setNewCourse(course)
    setEditingCourseId(course._id)
  }

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure to delete this course?')) return
    try {
      const res = await fetch(`http://127.0.0.1:5000/courses/${courseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      alert(data.message)
      fetchCourses()
    } catch (err) {
      console.error(err)
      alert('Failed to delete course')
    }
  }

  return (
    <div className='admin-dashboard-container'>
      <h2>Admin Dashboard</h2>

      {/* Tabs */}
      <div className='tabs'>
        <button
          className={selectedTab === 'students' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('students')}
        >
          Course Assign 
        </button>
        <button
          className={selectedTab === 'courses' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('courses')}
        >
          Course Management
        </button>
        <button
          className={selectedTab === 'feedback' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('feedback')}
        >
          Feedback
        </button>
      </div>

      {/* Student Assignment */}
      {selectedTab === 'students' && (
        <div className='dashboard-layout'>
          <div className='students-sidebar'>
            <h3>Students</h3>
            {students.map((student) => (
              <div
                key={student._id}
                className={`student-card ${
                  selectedStudent?._id === student._id ? 'selected' : ''
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                {student.username} ({student.courses?.length || 0})
              </div>
            ))}
          </div>

          <div className='center-panel'>
            {selectedStudent ? (
              <>
                <h3>{selectedStudent.username}</h3>
                <p>Courses Assigned: {selectedStudent.courses?.length || 0}</p>
                <div className='courses-selection'>
                  <h4>Select Courses to Assign/Update:</h4>
                  <div className='courses-list'>
                    {courses.map((course) => (
                      <label
                        key={course._id}
                        className='course-checkbox'
                      >
                        <input
                          type='checkbox'
                          checked={selectedCourses.includes(course._id)}
                          onChange={() => handleCourseToggle(course._id)}
                        />
                        {course.course_name} ({course.semester})
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  className='assign-btn'
                  onClick={handleAssignCourses}
                  disabled={assigning}
                >
                  {assigning ? 'Assigning...' : 'Assign Courses'}
                </button>
              </>
            ) : (
              <p>Select a student to view and assign courses</p>
            )}
          </div>
        </div>
      )}

      {/* Course Management */}
      {selectedTab === 'courses' && (
        <div className='course-management'>
          <h3>Manage Courses</h3>
          <div className='course-form'>
            <input
              type='text'
              name='course_name'
              placeholder='Course Name'
              value={newCourse.course_name}
              onChange={handleCourseChange}
            />
            <input
              type='text'
              name='semester'
              placeholder='Semester'
              value={newCourse.semester}
              onChange={handleCourseChange}
            />
            <input
              type='text'
              name='instructor'
              placeholder='Instructor'
              value={newCourse.instructor}
              onChange={handleCourseChange}
            />
            <input
              type='text'
              name='description'
              placeholder='Description'
              value={newCourse.description}
              onChange={handleCourseChange}
            />

            {/* Add / Update Button */}
            <button onClick={handleAddOrEditCourse}>
              {editingCourseId ? (
                <>
                  <FaEdit /> Update Course
                </>
              ) : (
                <>
                  <FaPlus /> Add Course
                </>
              )}
            </button>

            {/* Cancel Button (only show when editing) */}
            {editingCourseId && (
              <button
                type='button'
                className='cancel-btn'
                onClick={() => {
                  setNewCourse({
                    course_name: '',
                    instructor: '',
                    semester: '',
                    description: '',
                  })
                  setEditingCourseId(null)
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <div className='courses-table'>
            {courses.map((course) => (
              <div
                key={course._id}
                className='course-row'
              >
                <span>{course.course_name}</span>
                <span>{course.semester}</span>
                <span>{course.instructor}</span>
                <span>{course.description}</span>
                <div className='course-row-actions'>
                  <button onClick={() => handleEditCourse(course)}>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDeleteCourse(course._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Management */}
<<<<<<< Updated upstream
{selectedTab === 'feedback' && (
  <div className='feedback-management'>
    <div className='export-buttons'>
      <button onClick={() => window.open('http://127.0.0.1:5000/export/csv', '_blank')}>
        Export CSV
      </button>
      <button onClick={() => window.open('http://127.0.0.1:5000/export/pdf', '_blank')}>
        Export PDF
      </button>
    </div>

    <div className='feedback-center-panel'>
      <h3>All Feedbacks</h3>
      {feedbacks.length > 0 ? (
        <div className='feedback-list'>
          {feedbacks.map((fb) => (
            <div key={fb._id} className='feedback-item'>
              <strong>
                {fb.student_name} → {fb.course_name} ({fb.semester})
              </strong>
              <p>{fb.comment}</p>
              <small>Rating: {fb.rating || 'N/A'}</small>
            </div>
          ))}
=======
      {selectedTab === 'feedback' && (
        <div className='feedback-management'>
          <div className='feedback-center-panel'>
            <h3>All Feedbacks</h3>
            {feedbacks.length > 0 ? (
              <div className='feedback-list'>
                {feedbacks.map((fb) => {
                  // Find the course from courses state
                  const course = courses.find((c) => c._id === fb.course_id)

                  return (
                    <div
                      key={fb._id}
                      className='feedback-item'
                    >
                      <strong>
                        {fb.student_name} →{' '}
                        {course?.course_name || fb.course_name} (
                        {course?.semester || fb.semester})
                      </strong>
                      <p>{fb.comment}</p>
                      <small>Rating: {fb.rating || 'N/A'}</small>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p>No feedback available yet.</p>
            )}
          </div>
>>>>>>> Stashed changes
        </div>
      ) : (
        <p>No feedback available yet.</p>
      )}
    </div>
  </div>
)}

    </div>
  )
}

export default AdminDashboard
