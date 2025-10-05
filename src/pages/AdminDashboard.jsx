// import React, { useEffect, useState } from 'react'
// import Card from '../components/Card'
// import Button from '../components/Button'
// import { api } from '../api/api'
// import '../styles/AdminDashboard.css'

// const AdminDashboard = () => {
//   const [students, setStudents] = useState([])
//   const [courses, setCourses] = useState([])

//   // Fetch students and courses
//   useEffect(() => {
//     const fetchData = async () => {
//       const studentsRes = await api.get('/students')
//       setStudents(studentsRes.data)

//       const coursesRes = await api.get('/courses')
//       setCourses(coursesRes.data)
//     }
//     fetchData()
//   }, [])

//   const handleDeleteStudent = async (id) => {
//     if (!window.confirm('Are you sure to delete this student?')) return
//     await api.delete(`/students/${id}`)
//     setStudents((prev) => prev.filter((s) => s._id !== id))
//   }

//   const handleDeleteCourse = async (id) => {
//     if (!window.confirm('Are you sure to delete this course?')) return
//     await api.delete(`/courses/${id}`)
//     setCourses((prev) => prev.filter((c) => c._id !== id))
//   }

//   return (
//     <div className='admin-container'>
//       <h2>Students</h2>
//       <div className='admin-list'>
//         {students.map((student) => (
//           <Card key={student._id}>
//             <h3>{student.username}</h3>
//             <p>Email: {student.email}</p>
//             <Button
//               styleType='danger'
//               onClick={() => handleDeleteStudent(student._id)}
//             >
//               Delete
//             </Button>
//           </Card>
//         ))}
//       </div>

//       <h2>Courses</h2>
//       <div className='admin-list'>
//         {courses.map((course) => (
//           <Card key={course._id}>
//             <h3>{course.course_name}</h3>
//             <p>Instructor: {course.instructor}</p>
//             <p>Semester: {course.semester}</p>
//             <Button
//               styleType='danger'
//               onClick={() => handleDeleteCourse(course._id)}
//             >
//               Delete
//             </Button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard
