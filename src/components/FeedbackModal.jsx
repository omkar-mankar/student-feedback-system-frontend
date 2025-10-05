import { useState } from 'react'
import '../styles/StudentDashboard.css'

export default function FeedbackModal({ course, onClose, onSubmit }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ rating, comment })
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-card'>
        <h2 className='modal-title'>Feedback for {course.course_name}</h2>
        <form
          onSubmit={handleSubmit}
          className='modal-form'
        >
          <label className='modal-label'>Rating (1-5)</label>
          <input
            type='number'
            min='1'
            max='5'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='modal-input'
            required
          />

          <label className='modal-label'>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='modal-textarea'
            placeholder='Write something...'
          />

          <div className='modal-btns'>
            <button
              type='button'
              className='modal-cancel-btn'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='modal-submit-btn'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
