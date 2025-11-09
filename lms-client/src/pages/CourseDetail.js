import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    axios.get(`/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(console.error);
  }, [id]);

  if (!course) return <div>Loading...</div>;
  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Lessons</h3>
      {course.lessons?.length ? course.lessons.map((l, i) => (
        <div key={i} style={{ padding: 8, border: '1px solid #f0f0f0', marginBottom: 8 }}>
          <strong>{l.title}</strong>
          <p>{l.content}</p>
        </div>
      )) : <p>No lessons yet.</p>}
    </div>
  );
}
