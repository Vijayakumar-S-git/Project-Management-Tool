// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import the custom CSS

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
      navigate('/dashboard');
    } else {
      alert('Please enter email and password!');
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <h2>Welcome Back!</h2>
        <p>Log in to access your account.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Enter Your Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          <a href="#" onClick={() => console.log('Forgot Password clicked')}>
            Forgot Password?
          </a>
        </p>
        <p>
          Don’t have an account?{' '}
          <a href="/signup">Sign up here</a> {/* Changed to lowercase "/signup" */}
        </p>
      </div>
    </div>
  );
};

export default Login;