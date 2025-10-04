import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Feedback from './pages/StudentFeedback'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to='/login' />
  }

  return (
    <Router>
      <Navbar />
      <div className='app-container'>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/home' />}
          />
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/feedback'
            element={
              <PrivateRoute>
                <Feedback />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-dashboard'
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<h1>404 - Page Not Found</h1>}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom'
// import Register from './pages/Register'
// import Login from './pages/Login'
// import Feedback from './pages/StudentFeedback'
// import Home from './pages/Home'
// import './styles/App.css'

// function App() {
//   return (
//     <Router>
//       <div className='app-container'>
//         <Routes>
//           <Route
//             path='/'
//             element={<Navigate to='/home' />}
//           />
//           <Route
//             path='/home'
//             element={<Home />}
//           />
//           <Route
//             path='/register'
//             element={<Register />}
//           />
//           <Route
//             path='/login'
//             element={<Login />}
//           />
//           <Route
//             path='/feedback'
//             element={<Feedback />}
//           />
//           <Route
//             path='/admin-dashboard'
//             element={<div>Admin Dashboard</div>}
//           />
//           <Route
//             path='*'
//             element={<h1>404 - Page Not Found</h1>}
//           />
//         </Routes>
//       </div>
//     </Router>
//   )
// }
// export default App

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Feedback from "./pages/StudentFeedback";
// import "./styles/App.css";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Routes>
//           <Route path="/" element={<Navigate to="/register" />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           {/* Future routes for dashboards */}
//           <Route path="/feedback" element={<Feedback />} />
//           <Route path="/admin-dashboard" element={<div>Admin Dashboard</div>} />
//           <Home/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
