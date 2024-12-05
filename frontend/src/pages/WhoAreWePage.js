// frontend/src/pages/WhoAreWePage.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./WhoAreWePage.css";

// Function to open WhatsApp chat
const openWhatsAppChat = () => {
  window.open("https://wa.me/6591684367", "_blank");
};

  const WhoAreWePage = () => {
  // Render automatic rings in the background
  const renderAutomaticRings = () => {
    const ringCount = 5; // Number of concentric rings
    return Array.from({ length: ringCount }, (_, index) => (
      <div key={index} className="automatic-ring" style={{ animationDelay: `${index * 0.5}s` }}></div>
    ));
  };

  const navigate = useNavigate();
  // Function to navigate back to the homepage
  const handleBackClick = () => {
    navigate("/home"); // Navigate to the homepage
  };

  return (
    <div className="who-are-we-page">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>

      {/* Automatic concentric rings */}
      <div className="automatic-rings">{renderAutomaticRings()}</div>

      {/* WhatsApp Button */}
      <div className="whatsapp-button" onClick={openWhatsAppChat}>
        <img src="/whatsapp-logo2.png" alt="WhatsApp" className="whatsapp-logo" />
      </div>

      <div className="logo-header">
        <img src={`${process.env.PUBLIC_URL}/TLZ.jpeg`} alt="The Learning Zone Logo" className="logo" />
      </div>

      <div className="content-overlay">
        <div className="banner-section">
          <p>
            We noticed a lack of vetting and quality control in the market. Hence, we decided to take it upon ourselves to provide quality tuition to your doorstep. Contact us now to find a reliable private home tutor.
          </p>
        </div>

        <div className="price-section">
          <h2>Prices</h2>
          <p><strong>Primary:</strong> $35/h - $40/h</p>
          <p><strong>Lower Secondary:</strong> $40/h - $45/h</p>
          <p><strong>Upper Secondary:</strong> $45/h - $50/h</p>
          <p><strong>JC:</strong> $50/h - $55/h</p>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWePage;
