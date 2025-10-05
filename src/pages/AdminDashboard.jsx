// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react'
import '../styles/AdminDashboard.css'

function AdminDashboard() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])
  const token = localStorage.getItem('token')

  // Fetch students and courses
  useEffect(() => {
    fetch('http://127.0.0.1:5000/students', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err))

    fetch('http://127.0.0.1:5000/courses', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err))
  }, [token])

  // Select a student
  const handleStudentSelect = (student) => {
    setSelectedStudent(student)

    // Normalize student.courses to array of strings (course IDs)
    const assignedIds =
      student.courses?.map((c) => (typeof c === 'string' ? c : c._id)) || []
    setSelectedCourses(assignedIds)
  }

  // Toggle course selection
  const handleCourseToggle = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  // Assign courses
  const handleAssignCourses = async () => {
    if (!selectedStudent) return
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

      // Refresh students
      const updatedStudents = await fetch('http://127.0.0.1:5000/students', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json())
      setStudents(updatedStudents)

      // Refresh selected student
      const refreshedStudent = updatedStudents.find(
        (s) => s._id === selectedStudent._id
      )
      setSelectedStudent(refreshedStudent)
      const refreshedAssignedIds =
        refreshedStudent.courses?.map((c) =>
          typeof c === 'string' ? c : c._id
        ) || []
      setSelectedCourses(refreshedAssignedIds)
    } catch (err) {
      console.error(err)
      alert('Failed to assign courses')
    }
  }

  return (
    <div className='admin-dashboard-container'>
      <h2>Admin Dashboard</h2>
      <div className='dashboard-layout'>
        {/* Students Sidebar */}
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
              {student.username}
            </div>
          ))}
        </div>

        {/* Center Panel */}
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
                        checked={selectedCourses.includes(
                          course._id.toString()
                        )} // Ensure string comparison
                        onChange={() =>
                          handleCourseToggle(course._id.toString())
                        }
                      />
                      {course.course_name} ({course.semester})
                    </label>
                  ))}
                </div>
              </div>

              <button
                className='assign-btn'
                onClick={handleAssignCourses}
              >
                Assign Courses
              </button>
            </>
          ) : (
            <p>Select a student to view and assign courses</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
