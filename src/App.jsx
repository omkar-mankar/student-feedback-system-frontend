import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Feedback from './pages/StudentFeedback'
import Navbar from './components/Navbar'
// import AdminDashboard from './pages/AdminDashboard'
import Auth from './pages/Auth' // Combined login/register component
import AdminAssignCourses from './pages/AdminAssignCourses'

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
            path='/login'
            element={<Auth />}
          />
          <Route
            path='/register'
            element={<Auth />}
          />

          {/* Student Feedback page */}
          <Route
            path='/courses'
            element={
              <PrivateRoute>
                <Feedback />
              </PrivateRoute>
            }
          />

          {/* Admin pages */}
          {/* <Route
            path='/admin-dashboard'
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path='/assign-courses'
            element={
              <PrivateRoute>
                <AdminAssignCourses />
              </PrivateRoute>
            }
          /> */}

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
// import Home from './pages/Home'
// import Feedback from './pages/StudentFeedback'
// import Navbar from './components/Navbar'
// import AdminDashboard from './pages/AdminDashboard'
// import Auth from './pages/Auth' // Combined login/register component
// import AdminAssignCourses from './pages/AdminAssignCourses'

// function App() {
//   const PrivateRoute = ({ children }) => {
//     const token = localStorage.getItem('token')
//     return token ? children : <Navigate to='/login' />
//   }

//   return (
//     <Router>
//       <Navbar />
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
//             path='/login'
//             element={<Auth />}
//           />
//           <Route
//             path='/register'
//             element={<Auth />}
//           />

//           {/* Student Feedback page */}
//           <Route
//             path='/courses'
//             element={
//               <PrivateRoute>
//                 <Feedback />
//               </PrivateRoute>
//             }
//           />

//           {/* Admin pages */}
//           <Route
//             path='/admin-dashboard'
//             element={
//               <PrivateRoute>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path='/assign-courses'
//             element={
//               <PrivateRoute>
//                 <AdminAssignCourses />
//               </PrivateRoute>
//             }
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
