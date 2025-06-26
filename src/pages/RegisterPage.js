import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
