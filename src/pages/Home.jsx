import React from 'react'
import '../styles/Home.css'
import universityImage from '../assets/jsm_clg.jpg' // Place an image inside src/assets/

function Home() {
  return (
    <div className='home-container'>
      {/* Hero Section */}
      <header className='hero'>
        <img
          src={universityImage}
          alt='University'
          className='hero-img'
        />
        <div className='hero-text'>
          <h1>Welcome to Our University</h1>
          <p>
            The <strong>Student Feedback System</strong> helps us improve
            teaching quality by gathering feedback from students in real time.
          </p>
        </div>
      </header>

      {/* Info Section */}
      <section className='info'>
        <h2>About the Application</h2>
        <p>
          This platform enables students to provide anonymous and honest
          feedback on courses. Faculty and administrators can access insights
          through reports and charts, ensuring continuous improvement in
          teaching and curriculum.
        </p>
      </section>
    </div>
  )
}

export default Home
