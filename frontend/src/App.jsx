// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './components/style.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  const handleLogin = () => {
    setIsAuthenticated(true); // Simulate successful login
  };

  const handleSignup = () => {
    setIsAuthenticated(true); // Simulate successful signup
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Simulate logout (optional for future use)
  };

  return (
    <Router>
      <Routes>
        {/* If not authenticated, redirect to login; otherwise, allow access to dashboard */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/signup" 
          element={<Signup onSignup={handleSignup} />} 
        />
        {/* Default route points to login */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;