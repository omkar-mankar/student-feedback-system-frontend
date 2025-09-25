// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";
// import "../styles/Dashboard.css"; // optional for styling

// function AdminDashboard() {
//   const [adminData, setAdminData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token"); // token stored after login
//     const role = Cookies.get("role");   // role stored after login

//     if (!token || role !== "admin") {
//       // Not logged in OR not admin → redirect
//       navigate("/login");
//       return;
//     }

//     // Fetch protected admin data from backend
//     axios
//       .get("http://127.0.0.1:5000/admin/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setAdminData(res.data);
//       })
//       .catch((err) => {
//         console.error("Unauthorized:", err);
//         navigate("/login");
//       });
//   }, [navigate]);

//   const handleLogout = () => {
//     Cookies.remove("token");
//     Cookies.remove("role");
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-card">
//         <h2 className="dashboard-title">Admin Dashboard</h2>
//         <p className="dashboard-subtitle">
//           Welcome, <span className="highlight">Admin</span> 🎉
//         </p>

//         {adminData ? (
//           <div className="dashboard-content">
//             <p><b>Total Students:</b> {adminData.total_students}</p>
//             <p><b>Total Feedback:</b> {adminData.total_feedback}</p>
//           </div>
//         ) : (
//           <p>Loading data...</p>
//         )}

//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
