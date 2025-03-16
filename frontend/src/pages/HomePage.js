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
      {/* Automatic concentric rings */}
      <div className="automatic-rings">{renderAutomaticRings()}</div>

      {/* WhatsApp Button */}
      <div className="whatsapp-container">
        <img 
          src="/whatsapp-logo2.png" 
          alt="WhatsApp" 
          className="whatsapp-logo" 
          onClick={openWhatsAppChat}
        />
        <div 
          className="contact-agent" 
          onClick={openWhatsAppChat}
        >
          Click here to contact an agent!
        </div>
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
        <p className="subtitle"><em>Singapore's premium home tutors</em></p>
      </header>

      {/* Navigation buttons - Now before SEO content */}
      <div className="button-container">
        <button className="tutor-button apply-tutor" onClick={() => navigate("/signup")}>
          Apply As Tutor
        </button>
        <button className="tutor-button find-tutor" onClick={openWhatsAppChat}>
          Find A Tutor
        </button>
        <button className="tutor-button resources" onClick={() => navigate("/resources")}>
          Resources
        </button>
        <button className="tutor-button who-are-we" onClick={() => navigate("/who-are-we")}>
          Who Are We?
        </button>
        <button className="tutor-button blog-button" onClick={() => navigate("/blog")}>
          Our Blog
        </button>
        <button className="tutor-button terms-button" onClick={() => navigate("/terms-and-conditions")}>
          Terms & Conditions
        </button>
      </div>

      {/* SEO-friendly content sections - Now after the buttons */}
      <div className="seo-content">
        <section className="intro-section">
          <h2>Welcome to The Learning Zone – Singapore's Leading Home Tuition Agency</h2>
          <p>
            Finding the right tutor for your child is crucial for academic success. <strong>The Learning Zone </strong> 
            connects <strong>experienced home tutors</strong> with parents looking for <strong>personalised</strong> and <strong>effective</strong> learning.
            Whether your child needs help with <strong>PSLE, O-Level, A-Level, IB, or international curriculums</strong>,
            we provide the <strong>best private tutors</strong> in Singapore. To ensure quality, we vet all our tutors on their exeperience and qualifications.
          </p>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose The Learning Zone?</h2>
          <ul>
            <li>✅ <strong>Expert Tutors:</strong> Only the most qualified and experienced tutors are matched to your child.</li>
            <li>✅ <strong>Personalised Learning:</strong> Lessons are tailored to each student's strengths and weaknesses.</li>
            <li>✅ <strong>All Subjects & Levels:</strong> We offer tuition for <strong>Math, Science, English, Chinese, and more</strong>.</li>
            <li>✅ <strong>Flexible Scheduling:</strong> Tutors available for <strong>weekday and weekend</strong> lessons at your convenience.</li>
            <li>✅ <strong>Trusted by Parents:</strong> Hundreds of successful matches made across Singapore.</li>
          </ul>
        </section>

        <section className="get-started">
          <h2>Find Your Perfect Tutor Today!</h2>
          <p>
            Need a tutor? Let us help! If you're looking for <strong>1-1 private tuition</strong>, 
            The Learning Zone ensures your child gets the <strong>best guidance</strong> for academic excellence.  
            Click below to connect with a tutor now!
          </p>
          <button className="contact-button" onClick={openWhatsAppChat}>
            Contact Us on WhatsApp 📲
          </button>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
