import React, { useState } from "react";
import "../styles/Home.css";
import universityImage from "../assets/jsm_clg.jpg"; // Place an image inside src/assets/

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">Student Feedback System</div>
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/feedback">Feedback</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <img src={universityImage} alt="University" className="hero-img" />
        <div className="hero-text">
          <h1>Welcome to Our University</h1>
          <p>
            The <strong>Student Feedback System</strong> helps us improve
            teaching quality by gathering feedback from students in real time.
          </p>
        </div>
      </header>

      {/* Info Section */}
      <section className="info">
        <h2>About the Application</h2>
        <p>
          This platform enables students to provide anonymous and honest
          feedback on courses. Faculty and administrators can access insights
          through reports and charts, ensuring continuous improvement in
          teaching and curriculum.
        </p>
      </section>
    </div>
  );
}

export default Home;
