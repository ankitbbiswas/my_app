import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './homepage/HomePage';
import SearchBar from './components/SearchBar';
import LoginSignup from './components/Auth/LoginSignup';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([{ name: 'Event 1', description: 'Event Description' }]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by looking at localStorage
    const authStatus = localStorage.getItem('authenticated');
    setIsAuthenticated(!!authStatus); // Convert to boolean
  }, []);

  const handleAddEvent = () => {
    const newEvent = {
      name: `Event ${events.length + 1}`,
      description: 'Event Description',
    };
    setEvents([...events, newEvent]); // Add the new event to the list
  };

  const handleLogin = () => {
    localStorage.setItem('authenticated', true); // Set login status in localStorage
    setIsAuthenticated(true); // Update state to indicate login
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated'); // Remove login status from localStorage
    setIsAuthenticated(false); // Update state to indicate logout
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* If authenticated, redirect to home. Otherwise, show login/signup */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" /> : <LoginSignup onLogin={handleLogin} />} 
          />

          {/* Homepage route, accessible only if authenticated */}
          <Route 
            path="/home" 
            element={
              isAuthenticated ? (
                <div>
                  {/* Place SearchBar before HomePage */}
                  <div className="search-section">
                    <SearchBar onAddEvent={handleAddEvent} />
                  </div>
                  <HomePage events={events} setEvents={setEvents} handleLogout={handleLogout} />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
