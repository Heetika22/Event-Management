import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './EventCard.css';
import { api_uri } from '../../config';

function EventCard({ event, handleRegisterEvent, isAuthenticated, showRegisterButton = true }) {

  const navigate= useNavigate();
  
  const { _id, title, description, date, time, location, category, isRegistered } = event;
  const handleRegistration = async () => {
    if (!isAuthenticated) {
      console.log('User not authenticated. Redirecting to login page...');
      navigate('/Login');
      return;
    }

    try {
      const response = await fetch(`${api_uri}/api/auth/register-event/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setIsRegistered(true); 
      } else {
        console.error('Error registering for event:', response.statusText);
 
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
    <div className="event-card">
      <div className="event-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>
      {isAuthenticated && showRegisterButton && (
        <button className={`register-button ${isRegistered ? 'registered' : ''}`} onClick={() => handleRegisterEvent(event._id)}>Register</button>
      )}
    </div>
  );
}

export default EventCard;
