import React, { useState, useEffect } from 'react';
import './HomePage.css';
import SuggestionsPage from './SuggestionsPage'; // Import the Suggestions Page
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faProjectDiagram, faExclamationCircle, faPaperclip, faLink } from '@fortawesome/free-solid-svg-icons';

const HomePage = ({ events, setEvents, handleLogout }) => {
  const [showRightDiv, setShowRightDiv] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPage, setSelectedPage] = useState('events'); // Default to 'events' page
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [greeting, setGreeting] = useState(''); // State for greeting message

  // Function to fetch a greeting message from the API or local greeting
  const fetchGreeting = async () => {
    setGreeting('Hello User! How can I assist you today?'); // Fallback greeting
  };

  useEffect(() => {
    fetchGreeting(); // Fetch greeting when the component mounts
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowRightDiv(true);
  };

  const handleClose = () => {
    setShowRightDiv(false);
    setSelectedEvent(null);
    setIsEditing(false); // Reset editing mode
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    setShowRightDiv(false);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...chatMessages, { sender: 'User', text: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    // Simulate async call to AI API
    setTimeout(() => {
      const aiResponse = 'Thank you for your inquiry!'; // Simulated AI response
      setChatMessages([...newMessages, { sender: 'Bot', text: aiResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page); // Set the selected page
    setShowRightDiv(false); // Close the right div when switching between pages
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle between edit and view mode
  };

  const handleSaveChanges = () => {
    const updatedEvents = events.map((event) =>
      event === selectedEvent ? selectedEvent : event
    );
    setEvents(updatedEvents);
    setIsEditing(false); // Turn off editing mode after saving
  };

  const handleInputChange = (field, value) => {
    const updatedEvent = { ...selectedEvent, [field]: value };
    setSelectedEvent(updatedEvent);

    const updatedEvents = events.map((event) =>
      event === selectedEvent ? updatedEvent : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="container-event">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-img">AZ</div>
          <span className="profile-name">Profile User</span>
        </div>
        <nav className="menu">
          <ul>
            <li className="menu-item">
              <a href="#" className={`page-link ${selectedPage === 'suggestions' ? 'selected' : ''}`} onClick={() => handlePageSelect('suggestions')}>
                <h3 className="suggest">Suggestions</h3>
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className={`page-link ${selectedPage === 'events' ? 'selected' : ''}`} onClick={() => handlePageSelect('events')}>
                <h3 className="event">Event cards</h3>
              </a>
            </li>
          </ul>
        </nav>

        <div className="message">
          <h2>{greeting || 'Good Morning User!'}</h2>
          <p>Your event donation is really going well.</p>

          <div className="chat-component">
            <div id="chatbox" className="chatbox">
              {chatMessages.map((message, index) => (
                <div key={index} className={message.sender === 'User' ? 'user-message' : 'bot-message'}>
                  <strong>{message.sender}: </strong> {message.text}
                </div>
              ))}
            </div>

            <input
              type="text"
              id="userInput"
              placeholder="Have any doubts? Ask me"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button id="sendButton" onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>

      {/* Events Section */}
      {selectedPage === 'events' && (
        <div className="events-container">
          <h2 className="events-title">Events</h2>
          {events.map((event, index) => (
            <div
              key={index}
              className={`event-card ${selectedEvent === event ? 'selected' : ''}`}
              onClick={() => handleEventClick(event)}
            >
              <div className="event-info">
                <div className="event-text">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                </div>
                <div
                  className="event-circle"
                  style={{
                    background: `conic-gradient(#9b72d9 ${event.progress || 0}%, #ffe0cc ${
                      event.progress || 0
                    }% 100%)`,
                  }}
                >
                  <span className="progress-text">{event.progress || 0}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions Section */}
      {selectedPage === 'suggestions' && <SuggestionsPage />}

      {/* Right section (popup) */}
{showRightDiv && selectedEvent && (
  <div className="right-div">
    <div className="close-icon" onClick={handleClose}>
      &#10006;
    </div>

    {/* Event Name */}
    <div className="event-creation-item">
      <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
      <p className="label">Event Name</p>
      {isEditing ? (
        <input
          type="text"
          value={selectedEvent.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      ) : (
        <p>{selectedEvent.name || 'Untitled Event'}</p>
      )}
    </div>

    {/* Event Description */}
    <div className="event-creation-item">
      <FontAwesomeIcon icon={faPaperclip} className="icon" />
      <p className="label">Event Description</p>
      {isEditing ? (
        <textarea
          value={selectedEvent.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows="3"
        />
      ) : (
        <p>{selectedEvent.description || 'No event description provided'}</p>
      )}
    </div>

    {/* Event creator */}
    <div className="event-creation-item">
      <FontAwesomeIcon icon={faUser} className="icon" />
      <p className="label">Event Creator</p>
      <p>Me</p>
    </div>

          <div className="event-creation-item">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <p>Event Deadlines</p>
            {isEditing ? (
              <input
                type="date"
                value={selectedEvent.deadline || ''}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            ) : (
              <p>{selectedEvent.deadline || 'Today'}</p>
            )}
          </div>

          <div className="event-creation-item">
            <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
            <p>Event Projects</p>
            {isEditing ? (
              <input
                type="text"
                value={selectedEvent.project || ''}
                onChange={(e) => handleInputChange('project', e.target.value)}
              />
            ) : (
              <p>{selectedEvent.project || 'Secret project'}</p>
            )}
          </div>

          <div className="event-creation-item">
            <FontAwesomeIcon icon={faExclamationCircle} className="icon" />
            <p>Event Priority</p>
            {isEditing ? (
              <select
                value={selectedEvent.priority || 'Medium'}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            ) : (
              <p>{selectedEvent.priority || 'Medium'}</p>
            )}
          </div>

          <div className="event-creation-item">
            <FontAwesomeIcon icon={faPaperclip} className="icon" />
            <p>Event Attachments</p>
            {isEditing ? (
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.docx"
                onChange={(e) => handleInputChange('attachments', e.target.files[0])}
              />
            ) : (
              <p>{selectedEvent.attachments ? selectedEvent.attachments.name : 'No event attachments'}</p>
            )}
          </div>

          <div className="event-creation-item">
            <FontAwesomeIcon icon={faLink} className="icon" />
            <p>Event Links</p>
            {isEditing ? (
              <input
                type="url"
                placeholder="Enter event link"
                value={selectedEvent.links || ''}
                onChange={(e) => handleInputChange('links', e.target.value)}
              />
            ) : (
              <p>{selectedEvent.links || 'No event links'}</p>
            )}
          </div>

          <div className="event-creation-actions">
            {isEditing ? (
              <button className="save-event-btn" onClick={handleSaveChanges}>Save Changes</button>
            ) : (
              <button className="edit-event-btn" onClick={handleEditToggle}>Edit Event</button>
            )}
            <button className="delete-event-btn" onClick={handleDeleteEvent}>
              Delete Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
