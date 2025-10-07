import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import StudentDashboard from './pages/StudentDashboard'
import StudentFeedback from './pages/StudentFeedback'
import AdminDashboard from './pages/AdminDashboard'
import AdminReport from './pages/AdminReports'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='/login'
            element={<Auth />}
          />
          <Route
            path='/student-dashboard'
            element={<StudentDashboard />}
          />
          <Route
            path='/student-feedback'
            element={<StudentFeedback />}
          />
          <Route
            path='/admin-dashboard'
            element={<AdminDashboard />}
          />
          <Route
            path='/admin-report'
            element={<AdminReport />}
          />
          <Route
            path='/'
            element={<Home />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

// // src\App.jsx
// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import Auth from './pages/Auth'
// import StudentDashboard from './pages/StudentDashboard'
// import StudentFeedback from './pages/StudentFeedback'
// import AdminDashboard from './pages/AdminDashboard'
// import AdminReport from './pages/AdminReports'

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route
//           path='/home'
//           element={<Home />}
//         />
//         <Route
//           path='/login'
//           element={<Auth />}
//         />
//         <Route
//           path='/student-dashboard'
//           element={<StudentDashboard />}
//         />
//         <Route
//           path='/student-feedback'
//           element={<StudentFeedback />}
//         />
//         <Route
//           path='/admin-dashboard'
//           element={<AdminDashboard />}
//         />
//         <Route
//           path='/admin-report'
//           element={<AdminReport />}
//         />
//         <Route
//           path='/'
//           element={<Home />}
//         />
//       </Routes>
//     </Router>
//   )
// }

// export default App
