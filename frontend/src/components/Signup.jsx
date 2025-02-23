import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import the custom CSS

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (name && email && password) {
      onSignup(); // Set authenticated state
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <h2>Join us today!</h2>
        <p>Sign up now to become a member.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label>Choose A Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Re-Enter Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <p>
          Already a member?{' '}
          <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;