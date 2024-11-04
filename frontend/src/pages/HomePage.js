// frontend/src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="header">
        <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
        <h1>The Learning Zone</h1>
      </header>

      <div className="button-container">
        <button className="tutor-button apply-tutor" onClick={() => navigate('/signup')}>
          Apply as Tutor
        </button>
        <button className="tutor-button find-tutor" onClick={() => navigate('/find-tutors')}>
          Find Tutor
        </button>
      </div>

      <div className="button-container">
        <button className="tutor-button resources" onClick={() => navigate('/resources')}>
          Resources
        </button>
        <button className="tutor-button who-are-we" onClick={() => navigate('/who-are-we')}>
          Who are we
        </button>
        <button className="tutor-button terms-button" onClick={() => navigate('/terms-and-conditions')}>
          Terms and Conditions
        </button>
      </div>
    </div>
  );
}

export default HomePage;
