import React, { useEffect, useState } from "react";
import axios from "axios";
// import '../styles/AdminDashboard'

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  // Helper to read cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const role = getCookie("role");

  useEffect(() => {
    if (role !== "admin") {
      setMessage("Access denied. Only admin can view this page.");
      return;
    }

    const fetchData = async () => {
      try {
        const fbRes = await axios.get("http://localhost:5000/feedback/all", { withCredentials: true });  //get feedback
        setFeedbacks(fbRes.data);

        const studentsRes = await axios.get("http://localhost:5000/students", { withCredentials: true });   //students show
        setStudents(studentsRes.data);

        const coursesRes = await axios.get("http://localhost:5000/courses", { withCredentials: true });    //course showing 
        setCourses(coursesRes.data);
      } catch (err) {
        setMessage(err.response?.data?.error || "Error fetching data");
      }
    };

    fetchData();
  }, [role]);

  const handleLogout = () => {
    document.cookie = "user_id=; max-age=0";
    document.cookie = "role=; max-age=0";
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  // Export CSV
  const exportCSV = () => {
    window.open("http://localhost:5000/export/csv", "_blank");
  };

  // Export PDF
  const exportPDF = () => {
    window.open("http://localhost:5000/export/pdf", "_blank");
  };

  if (role !== "admin") 
    return <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>{message}</p>;

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-actions">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="export-btn" onClick={exportCSV}>Export CSV</button>
        <button className="export-btn" onClick={exportPDF}>Export PDF</button>
      </div>

      <section>
        <h3>Students</h3>
        <ul>
          {students.map((s) => (
            <li key={s._id}>{s.name} - {s.email}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Courses</h3>
        <ul>
          {courses.map((c) => (
            <li key={c._id}>{c.course_name} - Semester {c.semester}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Feedbacks</h3>
        <ul>
          {feedbacks.map((f) => (
            <li key={f._id}>
              <b>{f.course_name}</b> by {f.instructor} - Rating: {f.rating} - Comment: {f.comment || "N/A"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
