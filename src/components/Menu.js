import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Menu() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const credentials = {
      username: 'Linda', // Admin username
      password: 'password123', // Admin password
    };
  
    setIsLoading(true); // Set loading state to true during the login request
  
    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        setIsLoggedIn(data.success);
        setIsLoading(false); // Set loading state to false after successful login
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoggedIn(false); // Set isLoggedIn state to false on login error
        setIsLoading(false); // Set loading state to false after login error
      });
  };
  
  const isAdmin = true; // Replace with your admin authentication logic

  return (
    <div className="Menu">
      {isLoggedIn && !isAdmin && (
        <div className="admin-message">You need to log in as admin</div>
      )}
      <div className="menu-links">
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/meals">Meals</Link>
        &nbsp;|&nbsp;
        <Link to="/orderings">View order</Link>
        &nbsp;|&nbsp;
        {isAdmin ? (
          <Link to="api/v1/orderings">Orders Management (for Admin) </Link>
        ) : (
          <span></span>
        )}
      </div>
      {!isLoggedIn && (
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      )}
    </div>
  );
}
