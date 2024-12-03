// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [rings, setRings] = useState([]);

  // Navigation functions for each button
  const handleApplyClick = () => navigate('/signup');
  const handleFindClick = () => navigate('/find-tutors');
  const handleResourcesClick = () => navigate('/resources');
  const handleWhoAreWeClick = () => navigate('/who-are-we');
  const handleTermsClick = () => navigate('/terms-and-conditions');

  // Function to add a ring at the click position
  const handleAddRing = (event) => {
    const { clientX, clientY } = event;
    const newRing = { x: clientX, y: clientY, id: Date.now() };
    setRings((prevRings) => [...prevRings, newRing]);

    // Remove the ring after the animation completes (e.g., 2s)
    setTimeout(() => {
      setRings((prevRings) => prevRings.filter((ring) => ring.id !== newRing.id));
    }, 2000);
  };

  // Render automatic rings in the center of the page
  const renderAutomaticRings = () => {
    const ringCount = 5; // Number of concentric rings
    return Array.from({ length: ringCount }, (_, index) => (
      <div key={index} className="automatic-ring" style={{ animationDelay: `${index * 0.5}s` }}></div>
    ));
  };

  // Function to open WhatsApp chat
  const openWhatsAppChat = () => {
    window.open("https://wa.me/6591684367", "_blank");
  };


  return (
    <div className="home-page" onClick={handleAddRing}>
      {/* Automatic concentric rings */}
      <div className="automatic-rings">{renderAutomaticRings()}</div>

      {/* WhatsApp Button */}
      <div className="whatsapp-container">
          <div className="whatsapp-button" onClick={openWhatsAppChat}>
            <img src="/whatsapp-logo2.png" alt="WhatsApp" className="whatsapp-logo" />
          </div>
          {/* Bold line */}
          <p className="contact-agent"><strong>Click here to contact an agent!</strong></p>
      </div>


      {/* Click rings that appear at mouse click positions */}
      {rings.map((ring) => (
        <div
          key={ring.id}
          className="click-ring"
          style={{
            left: ring.x,
            top: ring.y,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      ))}

      {/* Header and buttons */}
      <header className="header">
        <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
        <h1 className="title">The Learning Zone</h1>
      </header>

      <div className="button-container">
        <button className="tutor-button apply-tutor" onClick={handleApplyClick}>
          Apply As Tutor
        </button>
        <button className="tutor-button find-tutor" onClick={handleFindClick}>
          Find Tutor
        </button>
      </div>

      <div className="button-container">
        <button className="tutor-button resources" onClick={handleResourcesClick}>
          Resources
        </button>
        <button className="tutor-button who-are-we" onClick={handleWhoAreWeClick}>
          Who Are We
        </button>
        <button className="tutor-button terms-button" onClick={handleTermsClick}>
          Terms And Conditions
        </button>
      </div>
    </div>
  );
}

export default HomePage;
