import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Future routes for dashboards */}
          <Route path="/student-dashboard" element={<div>Student Dashboard</div>} />
          <Route path="/admin-dashboard" element={<div>Admin Dashboard</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
