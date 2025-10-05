import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/AdminAssignCourses.css'

function AdminAssignCourses() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedCourses, setSelectedCourses] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    // Fetch all students
    axios
      .get('http://127.0.0.1:5000/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err))

    // Fetch all courses
    axios
      .get('http://127.0.0.1:5000/courses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err))
  }, [token])

  const handleAssign = () => {
    if (!selectedStudent) return alert('Select a student')
    axios
      .put(
        `http://127.0.0.1:5000/students/${selectedStudent}/assign-courses`,
        { course_ids: selectedCourses },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response?.data?.error || 'Assignment failed'))
  }

  const handleCourseChange = (e) => {
    const options = e.target.options
    const values = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) values.push(options[i].value)
    }
    setSelectedCourses(values)
  }

  return (
    <div className='assign-container'>
      <div className='assign-card'>
        <h2>Assign Courses to Students</h2>

        <label>Student:</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value=''>Select a student</option>
          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.username} ({student.email})
            </option>
          ))}
        </select>

        <label>Courses:</label>
        <select
          multiple
          value={selectedCourses}
          onChange={handleCourseChange}
        >
          {courses.map((course) => (
            <option
              key={course._id}
              value={course._id}
            >
              {course.course_name} ({course.semester})
            </option>
          ))}
        </select>

        <button onClick={handleAssign}>Assign Courses</button>
      </div>
    </div>
  )
}

export default AdminAssignCourses
