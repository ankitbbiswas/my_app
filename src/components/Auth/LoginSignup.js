import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating to other routes
import './Auth.css';

const LoginSignup = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between login and signup
  const navigate = useNavigate(); // To navigate after login/signup

  const handleLoginSignup = (e) => {
    e.preventDefault();
    // Mock authentication logic (you can replace this with real logic later)
    if (email && password) {
      onLogin(); // Call the login handler (sets localStorage and updates state)
      navigate('/home'); // Redirect to homepage after clicking login or signup
    } else {
      alert('Please fill in both fields');
    }
  };

  const handleSignupToggle = () => {
    setIsSigningUp(!isSigningUp); // Toggle between login and signup
  };

  return (
    <div className="login-container">
      <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2> {/* Change the title based on the state */}
      <form onSubmit={handleLoginSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          {isSigningUp ? 'Sign Up' : 'Login'}
        </button> {/* Change button text */}
      </form>
      
      <p>
        {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
        <span onClick={handleSignupToggle} className="signup-toggle-btn">
          {isSigningUp ? 'Login' : 'Sign Up'}
        </span>
      </p>
    </div>
  );
};

export default LoginSignup;
