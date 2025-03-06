import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/myman/forgot-password',
        { email }
      );
      setMessage(response.data.message || 'Reset email sent');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Request failed');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{message}</p>
      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;