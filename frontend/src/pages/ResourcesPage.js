// frontend/src/pages/ResourcesPage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ResourcesPage.css';

// Function to open WhatsApp chat
const openWhatsAppChat = () => {
  window.open("https://wa.me/6591684367", "_blank");
};


function ResourcesPage() {

  const navigate = useNavigate();
  // Function to navigate back to the homepage
  const handleBackClick = () => {
    navigate("/home"); // Navigate to the homepage
  };
  return (
    <div className="resources-page">

      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>

      <header className="resources-header">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="resources-logo" />
        </Link>
        <h1>Resources</h1>
      </header>

      {/* WhatsApp Button */}
      <div className="whatsapp-container" onClick={openWhatsAppChat}>
        <img src="/whatsapp-logo2.png" alt="WhatsApp" className="whatsapp-logo" />
        <div className="contact-agent">
          Click here to contact an agent!
        </div>
      </div>


      <div className="resource-card">
        <h2>Free Resources</h2>
        <p>
          Access a variety of free resources to support your learning journey. Click below to explore!
        </p>
        <a href="https://drive.google.com/drive/folders/1gC6GQLgcuoHzwDXtEGzTwvzCz0YsYuwg" target="_blank" rel="noopener noreferrer" className="resource-link">
          Google Drive Grail
        </a>
        <a href="https://grail.moe/library" target="_blank" rel="noopener noreferrer" className="resource-link">
          MOE Library Grail
        </a>
        <a href="https://sgtestpaper.com/" target="_blank" rel="noopener noreferrer" className="resource-link">
          Test Papers (Primary, Secondary, JC)
        </a>
      </div>

      <div className="resource-card discounted">
        <h2>Discounted Resources</h2>
        <p>
          Use code: <strong>thelearningzone</strong> for 5% off on all resources.
        </p>
        <a href="https://rtr.sg" target="_blank" rel="noopener noreferrer" className="resource-link">
          Discounted Resources
        </a>
      </div>
    </div>
  );
}

export default ResourcesPage;

