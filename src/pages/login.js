import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../components/style/login.css';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.replace('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {showError && <div className="error">{error}</div>}
        <button type="submit" className="btn-login">Login</button>
        <button type="button" className="btn-login" onClick={handleSignupClick}>Signup</button>
      </form>
    </div>
  );
}

export default Login;
