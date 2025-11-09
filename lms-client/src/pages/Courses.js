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
    <div>
      <h2>Courses</h2>
      {courses.map(c => (
        <div key={c._id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10 }}>
          <h3><Link to={`/courses/${c._id}`}>{c.title}</Link></h3>
          <p>{c.description}</p>
          <small>Instructor: {c.instructor?.name}</small>
        </div>
      ))}
    </div>
  );
}
