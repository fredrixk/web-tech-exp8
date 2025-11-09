import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Courses(){
  const [courses, setCourses] = useState([]);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(()=>{
    axios.get(`${API}/api/courses`).then(r=>setCourses(r.data)).catch(console.error);
  },[])

  const enroll = async (id) => {
    const token = localStorage.getItem('token');
    try{
      await axios.post(`${API}/api/enroll/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert('Enrolled!');
    }catch(err){
      alert(err.response?.data?.message || 'Enroll failed');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Courses</h2>
      {courses.map(c => (
        <div key={c._id} style={{border:'1px solid #ddd', margin:10, padding:10}}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <button onClick={()=>enroll(c._id)}>Enroll</button>
        </div>
      ))}
    </div>
  )
}
