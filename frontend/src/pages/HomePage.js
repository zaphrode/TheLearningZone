// frontend/src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [rings, setRings] = useState([]);

  // Navigation functions for each button
  const handleApplyClick = () => navigate('/signup');
  const handleFindClick = () => navigate('/testimonials-and-qualifications');
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
      <Helmet>
        <title>The Learning Zone | Online Learning Platform</title>
        <meta name="description" content="Learn and grow with The Learning Zone - your go-to platform for online education, tutoring, and study resources." />
      </Helmet>
      {/* Automatic concentric rings */}
      <div className="automatic-rings">{renderAutomaticRings()}</div>

      {/* WhatsApp Button */}
      <div className="whatsapp-container">
        <div className="whatsapp-button" onClick={openWhatsAppChat}>
          <img src="/whatsapp-logo2.png" alt="WhatsApp" className="whatsapp-logo" />
        </div>
        <div className="contact-agent">Click here to contact an agent!</div>
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
        <p className="subtitle"><em>Singapore's premium home tutors</em></p> {/* Added subtitle */}
      </header>

      <div className="button-container">
        <button className="tutor-button apply-tutor" onClick={handleApplyClick}>
          Apply As Tutor
        </button>
        <button className="tutor-button find-tutor" onClick={handleFindClick}>
          Testimonials And&nbsp;Qualifications
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
