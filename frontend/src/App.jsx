import React from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <div style={{padding:20}}>
      <h1>Simple LMS</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/courses">Courses</Link>
      </nav>
      <p>Use this small frontend to test the backend APIs. Configure the API URL in <code>.env</code> or set <code>VITE_API_URL</code>.</p>
    </div>
  )
}
