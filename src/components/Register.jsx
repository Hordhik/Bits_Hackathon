import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await axios.post('http://localhost:5090/api/auth/register', registrationData);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        if (response.data.user.role === 'organizer') {
          navigate('/organizer-dashboard');
        } else {
          navigate('/events');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(
        error.response?.data?.message || 
        'An error occurred during registration. Please try again.'
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-paper">
        <h1 className="login-title">
          Create Account
          <span className="login-subtitle">Join FeedbackPro today</span>
        </h1>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
            />
          </div>
          <div className="form-field">
            <input
              type="email"
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
              minLength="6"
            />
          </div>
          <div className="form-field">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
            Sign Up
          </button>
          <p className="login-link">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#2563eb', cursor: 'pointer' }}>
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register; 