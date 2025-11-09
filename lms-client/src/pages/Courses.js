import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get('/api/courses')
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="courses-page">
      <h2>Courses</h2>
      <div className="courses-list">
        {courses.map(c => (
          <div key={c._id} className="course-card">
            <h3><Link to={`/courses/${c._id}`}>{c.title}</Link></h3>
            <p>{c.description}</p>
            <small>Instructor: {c.instructor?.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
