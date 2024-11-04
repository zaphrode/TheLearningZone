// frontend/src/pages/WhoAreWePage.js
import React from "react";
import "./WhoAreWePage.css";

const WhoAreWePage = () => {
  return (
    <div
      className="who-are-we-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/tlz2.webp'})`,
      }}
    >
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
          <p><strong>Primary:</strong> $35/h</p>
          <p><strong>Lower Secondary:</strong> $40/h</p>
          <p><strong>Upper Secondary:</strong> $45/h</p>
          <p><strong>JC:</strong> $50/h</p>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWePage;

