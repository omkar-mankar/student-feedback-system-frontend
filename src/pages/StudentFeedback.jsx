import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Feedback.css";


function StudentFeedback() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const [form, setForm] = useState({ rating: "", comment: "" });
  const [message, setMessage] = useState("");

  // Fetch courses on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/courses", { withCredentials: true })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle course selection
  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    const course = courses.find((c) => c._id === courseId);
    setCourseDetails(course || null);
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      setMessage("Please select a course");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/feedback",
        {
          course_id: selectedCourse,
          rating: form.rating,
          comment: form.comment,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message);
      setForm({ rating: "", comment: "" });
      setSelectedCourse("");
      setCourseDetails(null);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error submitting feedback");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>

      {/* Course selection */}
      <div>
        <label>Select Course:</label>
        <select value={selectedCourse} onChange={handleCourseSelect}>
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.course_name} (Semester: {course.semester})
            </option>
          ))}
        </select>
      </div>

      {/* Show course details */}
      {courseDetails && (
        <div className="course-details">
          <p><b>Course:</b> {courseDetails.course_name}</p>
          <p><b>Semester:</b> {courseDetails.semester}</p>
          <p><b>Instructor:</b> {courseDetails.instructor}</p>
        </div>
      )}

      {/* Feedback form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Enter your feedback here..."
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default StudentFeedback;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function FeedbackForm() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [form, setForm] = useState({ rating: "", comment: "" });
//   const [message, setMessage] = useState("");

//   // Fetch courses on load
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/courses", { withCredentials: true })
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleCourseSelect = (e) => {
//     const courseId = e.target.value;
//     const course = courses.find((c) => c._id === courseId);
//     setSelectedCourse(course);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedCourse) {
//       setMessage("Please select a course.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/feedback",
//         {
//           course_id: selectedCourse._id,
//           rating: form.rating,
//           comment: form.comment,
//         },
//         { withCredentials: true }
//       );
//       setMessage(res.data.message);
//       setForm({ rating: "", comment: "" });
//       setSelectedCourse(null);
//     } catch (err) {
//       setMessage(err.response?.data?.error || "Error submitting feedback");
//     }
//   };

//   return (
//     <div className="feedback-container">
//       <h2>Submit Feedback</h2>

//       {/* Select course */}
//       <label>Select Course:</label>
//       <select onChange={handleCourseSelect} value={selectedCourse?._id || ""}>
//         <option value="">-- Select a course --</option>
//         {courses.map((course) => (
//           <option key={course._id} value={course._id}>
//             {course.course_name}
//           </option>
//         ))}
//       </select>

//       {/* Show course details */}
//       {selectedCourse && (
//         <div className="course-details">
//           <p><b>Semester:</b> {selectedCourse.semester}</p>
//           <p><b>Instructor:</b> {selectedCourse.instructor}</p>
//         </div>
//       )}

//       {/* Feedback Form */}
//       <form onSubmit={handleSubmit}>
//         <label>Rating (1-5):</label>
//         <input
//           type="number"
//           name="rating"
//           min="1"
//           max="5"
//           value={form.rating}
//           onChange={handleChange}
//           required
//         />

//         <label>Comment:</label>
//         <textarea
//           name="comment"
//           value={form.comment}
//           onChange={handleChange}
//           placeholder="Write your feedback here..."
//         />

//         <button type="submit">Submit Feedback</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default FeedbackForm;


