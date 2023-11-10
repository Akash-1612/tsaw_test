import './authPage.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      // Registration successful
      console.log('Registration successful');
      alert('Registration successful');
    } catch (error) {
      alert('Registration error:', error.response.data.error);
      console.error('Registration error:', error.response.data.error);
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // Login successful
      alert('Login successful');
      console.log('Login successful');
      console.log('Token:', response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      alert('Login error:', error.response.data.error);
      console.error('Login error:', error.response.data.error);
    }
    setEmail('');
    setPassword('');
  };

  const toggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  return (
    <div className='auth-body'>
      <div className='loadpage-wrapper'>
        <div className={`containerone ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleCreateAccount}>
              <h1>Create Account</h1>

              <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
              <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              <button>Login</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className={`overlay ${isSignUpActive ? 'right-panel-active' : ''}`}>
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Login to view all the Contacts. 😎</p>
                <button className="ghost" onClick={toggleForm} id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello!</h1>
                <p>Create an account with us to save contact Information. 📝</p>
                <button className="ghost" onClick={toggleForm} id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

