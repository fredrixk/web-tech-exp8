import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch(err => alert(err.response?.data?.error || 'Login failed'));
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
