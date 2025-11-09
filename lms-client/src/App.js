import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/">Courses</Link>
          <span className="nav-sep">|</span>
          <Link to="/login">Login</Link>
          <span className="nav-sep">|</span>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <main className="container">
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
