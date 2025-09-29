import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [courseId, setCourseId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/feedback",
        {
          course_id: courseId,
          rating: rating,
          comment: comment,
        },
        {
          withCredentials: true, // 👈 Important: Send cookies
        }
      );
      setMessage(res.data.message);
      setCourseId("");
      setRating(5);
      setComment("");
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Failed to submit feedback. Try again."
      );
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Course Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Course ID:</label>
        <input
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />

        <label>Rating (1–5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label>Comment (optional):</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Feedback;
