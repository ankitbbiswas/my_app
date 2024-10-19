import React from 'react';
import './SearchBar.css';

function SearchBar({ onAddEvent }) {
  return (
    <div className="search-bar">
      <div className="input">
        <input 
          type="text" 
          placeholder="Search events" 
          className="search-input"
        />
      </div>
      <div className="add-event">
        {/* Call onAddEvent when the button is clicked */}
        <button className="add-event-btn" onClick={onAddEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
