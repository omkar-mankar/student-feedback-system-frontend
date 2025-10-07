# Student Feedback System Frontend

A React-based frontend application for a college student feedback system. This platform allows students to provide anonymous feedback on courses, while administrators can manage course assignments and view detailed reports to improve teaching quality.

## Features

- **Student Dashboard**: View assigned courses and submit feedback.
- **Feedback Submission**: Anonymous feedback forms for courses.
- **Admin Dashboard**: Manage students, courses, and assignments.
- **Reports and Analytics**: View feedback reports and insights.
- **Authentication**: Secure login for students and admins.
- **Responsive Design**: Works on desktop and mobile devices.

## Tech Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: Custom CSS
- **Build Tool**: Vite
- **Linting**: ESLint

## Requirements

- Node.js (version 16 or higher)
- npm or yarn
- Backend API running on `http://127.0.0.1:5000` (Flask-based backend)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sfs-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the backend is running on port 5000.

## How to Run

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (default Vite port).

3. The app will connect to the backend API at `http://127.0.0.1:5000`.

## Project Structure

```
sfs-frontend/
├── public/
│   ├── vite.svg
│   └── images/
├── src/
│   ├── assets/
│   │   ├── jsm_clg.jpg
│   │   └── react.svg
│   ├── components/
│   │   ├── CourseCard.jsx
│   │   ├── FeedbackModal.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── AdminAssignCourses.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminReports.jsx
│   │   ├── Auth.jsx
│   │   ├── Home.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── StudentFeedback.jsx
│   ├── styles/
│   │   ├── AdminAssignCourses.css
│   │   ├── AdminDashboard.css
│   │   ├── AdminReport.css
│   │   ├── App.css
│   │   ├── Auth.css
│   │   ├── Home.css
│   │   ├── index.css
│   │   ├── Navbar.css
│   │   ├── StudentDashboard.css
│   │   └── StudentFeedback.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License

This project is licensed under the MIT License.


Admin Credentials:
omkar@gmail.com
omkar123

student credential(you can register via app)

saved users:

jaggu@gmail.com
jaggu1234