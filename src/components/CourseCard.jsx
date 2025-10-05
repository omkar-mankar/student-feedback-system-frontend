// src/components/CourseCard.jsx
import React from 'react'
import './StudentDashboard.css'

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      className='course-card'
      onClick={() => onClick(course)}
    >
      <h3>{course.course_name}</h3>
      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>
      <p>
        <strong>Semester:</strong> {course.semester}
      </p>
    </div>
  )
}

export default CourseCard
