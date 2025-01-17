import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  )
}

export default NotFound
