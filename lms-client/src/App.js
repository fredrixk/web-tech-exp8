import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Courses</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <main style={{ padding: 10 }}>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
