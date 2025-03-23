import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'attendee',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5090/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.user.role === 'organizer') {
        navigate('/organizer-dashboard');
      } else {
        navigate('/events');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-paper">
        <h1 className="login-title">
          Welcome to FeedbackPro 
          <span className="login-subtitle">Sign in to your account</span>
        </h1>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
          <p className="register-link">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} style={{ color: '#2563eb', cursor: 'pointer' }}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;