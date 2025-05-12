import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import '../styles/Login.css';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();  // useNavigate instead of useHistory

  const handleSubmit = e => {
    e.preventDefault();
    const license = e.target.license.value;
    const password = e.target.password.value;

    if (license.length > 0 && password.length > 0) {
      loginUser(license, password)
        .then(() => {
          // After successful login, use navigate to redirect
          navigate('/dashboard');  // use navigate instead of history.push
        })
        .catch(error => {
          // Handle error
          console.error("Login failed: ", error);
        });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome back 👋</h2>
      <p className="login-subtitle">Sign into your account</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="license"
          placeholder="Hospital License"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="login-footer">
        Don’t have an account?
        <Link to="/register"> Register Here</Link>
      </div>
    </div>
  );
}

export default LoginPage;
