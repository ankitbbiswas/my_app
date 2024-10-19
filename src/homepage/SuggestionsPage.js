// SuggestionsPage.js
import React from 'react';
import './SuggestionsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const SuggestionsPage = () => {
  const suggestions = [
    {
      id: 1,
      title: "Improve Event Visibility",
      description: "Consider using more vibrant colors and larger fonts for important event details to improve visibility.",
      imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
      icon: faLightbulb,
    },
    {
      id: 2,
      title: "Interactive Elements",
      description: "Make your event cards interactive by adding animations when they are hovered over.",
      imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
      icon: faThumbsUp,
    },
  ];

  return (
    <div className="suggestions-container">
      <h2 className="suggestions-title">Suggestions</h2>

      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-bubble">
            <div className="suggestion-icon">
              <FontAwesomeIcon icon={suggestion.icon} />
            </div>
            <div className="suggestion-content">
              <h3>{suggestion.title}</h3>
              <p>{suggestion.description}</p>
              <img src={suggestion.imageUrl} alt={suggestion.title} className="suggestion-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPage;
