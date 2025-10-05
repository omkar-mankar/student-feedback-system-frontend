import React, { useState } from 'react'
import '../styles/AdminReport.css'
import { FaFileCsv, FaFilePdf } from 'react-icons/fa'

const AdminReport = () => {
  const [loadingType, setLoadingType] = useState(null)
  const token = localStorage.getItem('token')

  const handleDownload = async (type) => {
    try {
      setLoadingType(type)
      const endpoint =
        type === 'csv'
          ? 'http://127.0.0.1:5000/export/csv'
          : 'http://127.0.0.1:5000/export/pdf'

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        alert(data.error || 'Failed to download report.')
        setLoadingType(null)
        return
      }

      // Get blob data
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `feedback_report.${type}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      setLoadingType(null)
    } catch (error) {
      console.error(error)
      alert('Something went wrong while downloading.')
      setLoadingType(null)
    }
  }

  return (
    <div className='report-container'>
      <div className='report-card'>
        <h2>📊 Generate Feedback Reports</h2>
        <p>
          Export all student feedback records in your preferred format. Choose
          between <strong>CSV</strong> or <strong>PDF</strong>.
        </p>
        <div className='report-buttons'>
          <button
            className='csv-btn'
            onClick={() => handleDownload('csv')}
            disabled={loadingType === 'csv'}
          >
            {loadingType === 'csv' ? (
              'Generating CSV...'
            ) : (
              <>
                <FaFileCsv className='icon' /> Export as CSV
              </>
            )}
          </button>
          <button
            className='pdf-btn'
            onClick={() => handleDownload('pdf')}
            disabled={loadingType === 'pdf'}
          >
            {loadingType === 'pdf' ? (
              'Generating PDF...'
            ) : (
              <>
                <FaFilePdf className='icon' /> Export as PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminReport
