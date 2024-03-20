import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/login.module.css';
import { useDarkMode } from '../context/DarkModeContext'; 

const Login = () => {
  const { state } = useDarkMode();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-knol.onrender.com/api/user/login', {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      if (window.confirm('LogIn Successfull')) {
        window.location.href = '/';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.loginBox}>
        <div className={styles.loginContainer}>
          <p>Login</p>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br />
            <button type="submit" className={styles.login}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
