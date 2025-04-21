// frontend/src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
        <title>1-1 Home Tuition Singapore | Private Tutors | The Learning Zone</title>
        <meta name="description" content="The Learning Zone provides qualified private tutors and 1-1 home tuition in Singapore. Professional home tutors for all levels and subjects to improve grades." />
        <meta name="keywords" content="1-1 home tuition Singapore, private tuition Singapore, private tutors Singapore, home tutors Singapore, tuition agency, tuition teacher, math tutor, English tutor, science tutor" />
        <link rel="canonical" href="https://the-learning-zone.vercel.app" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="1-1 Home Tuition Singapore | Private Tutors | The Learning Zone" />
        <meta property="og:description" content="Find qualified private tutors in Singapore for personalized 1-1 home tuition. Expert home tutors for all subjects and levels." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://the-learning-zone.vercel.app" />
        <meta property="og:image" content="https://the-learning-zone.vercel.app/TLZ.jpeg" />
        
        {/* Structured Data - Local Business */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "The Learning Zone - Singapore Home Tuition",
            "description": "Singapore's premium private home tuition agency providing qualified and experienced 1-1 tutors.",
            "url": "https://the-learning-zone.vercel.app",
            "logo": "https://the-learning-zone.vercel.app/TLZ.jpeg",
            "telephone": "+6591684367",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Singapore"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "1.3521",
              "longitude": "103.8198"
            },
            "priceRange": "$$",
            "sameAs": [
              "https://wa.me/6591684367"
            ],
            "areaServed": {
              "@type": "State",
              "name": "Singapore"
            },
            "knowsAbout": ["Private Tuition", "Home Tutoring", "PSLE Preparation", "O-Level Tuition", "A-Level Tuition"],
            "offers": {
              "@type": "Offer",
              "description": "1-1 Private Home Tuition in Singapore",
              "availableAtOrFrom": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "Singapore"
                }
              }
            }
          }
        `}</script>
      </Helmet>
      
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
        <button className="tutor-button testimonials" onClick={() => navigate("/testimonials-and-qualifications")}>
          Testimonials & Qualifications
        </button>
        <button className="tutor-button resources" onClick={() => navigate("/resources")}>
          Resources
        </button>
        <button className="tutor-button who-are-we" onClick={() => navigate("/who-are-we")}>
          Who Are We?
        </button>
        <button className="tutor-button blog-button" onClick={() => navigate("/blog")}>
          Our Blogs
        </button>
        <button className="tutor-button ai-chat-button" onClick={() => navigate("/ai-chat")}>
          AI Tutor Chat
        </button>
        <button className="tutor-button terms-button" onClick={() => navigate("/terms-and-conditions")}>
          Terms & Conditions
        </button>
      </div>

      {/* SEO-friendly content sections - Now after the buttons */}
      <div className="seo-content">
        <section className="intro-section">
          <h2>Welcome to The Learning Zone – Singapore's Leading 1-1 Home Tuition Agency</h2>
          <p>
            Finding the right private tutor for your child is crucial for academic success. <strong>The Learning Zone</strong> 
            connects <strong>experienced home tutors in Singapore</strong> with parents looking for <strong>personalised 1-1 private tuition</strong>.
            Whether your child needs help with <strong>PSLE, O-Level, A-Level, IB, or international curriculums</strong>,
            we provide the <strong>best private tutors in Singapore</strong>. To ensure quality, we vet all our tutors on their experience and qualifications.
          </p>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose The Learning Zone for Private Home Tuition in Singapore?</h2>
          <ul>
            <li>✅ <strong>Expert Home Tutors:</strong> Only the most qualified and experienced private tutors are matched to your child.</li>
            <li>✅ <strong>Personalised 1-1 Learning:</strong> Lessons are tailored to each student's strengths and weaknesses.</li>
            <li>✅ <strong>All Subjects & Levels:</strong> We offer private tuition for <strong>Math, Science, English, Chinese, and more</strong>.</li>
            <li>✅ <strong>Flexible Scheduling:</strong> Home tutors available for <strong>weekday and weekend</strong> lessons at your convenience.</li>
            <li>✅ <strong>Trusted by Parents:</strong> Hundreds of successful matches made across Singapore.</li>
          </ul>
        </section>

        <section className="get-started">
          <h2>Find Your Perfect Private Tutor in Singapore Today!</h2>
          <p>
            Need a home tutor? Let us help! If you're looking for <strong>1-1 private home tuition in Singapore</strong>, 
            The Learning Zone ensures your child gets the <strong>best guidance</strong> for academic excellence.  
            Click below to connect with a private tutor now!
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
