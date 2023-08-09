import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logo from './logo.png'

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  }, [navigate, setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        const token = data.token;
   
        localStorage.setItem('token', token); // Save the token in local storage
        setIsLoggedIn(true); // Set isLoggedIn state to true
        navigate('/dashboard'); // Redirect to home page
      } else {
        // Login failed
        const errorMessage = data.error;
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again.'); // Set error message for general error
    }
  };

  return (
    <>
      <div className='body'>
        <div className='wrapper'>
          <div className='form-wrapper sign-in'>
            <form onSubmit={handleSubmit}>
            <div className='logo-container'>
              {/* <h1 className='idea-logo'>
                Ideas Matel
              </h1> */}
                {/* <img src={Logo} alt='Logo' className='login-logo' /> */}
              </div>
              <h2>Login</h2>
              <div className='input-group'>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Username'
                  required
                />
              </div>
              <div className='input-group'>
                {/* <label htmlFor=''>Password</label> */}
                {/* <br /> */}
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
              </div>
              <button type='submit' variant='light' className='loginbtn'>
                Login
              </button>
              {errorMessage && <p className='error'>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
