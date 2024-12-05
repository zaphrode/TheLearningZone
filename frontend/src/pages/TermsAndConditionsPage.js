// frontend/src/pages/TermsAndConditionsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TermsAndConditionsPage.css';

const TermsAndConditionsPage = () => {
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // Function to open WhatsApp chat
  const openWhatsAppChat = () => {
      window.open("https://wa.me/6591684367", "_blank");
  };
  const navigate = useNavigate();
  // Function to navigate back to the homepage
  const handleBackClick = () => {
    navigate("/home"); // Navigate to the homepage
  };
  

  return (
    <div className="terms-and-conditions-page">

      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>

      <h1>Terms and Conditions</h1>

        {/* WhatsApp Button */}
        <div className="whatsapp-button" onClick={openWhatsAppChat}>
            <img src="/whatsapp-logo2.png" alt="WhatsApp" className="whatsapp-logo" />
        </div>
  
      {/* Clients Section */}
      <div className="collapsible-section">
        <button onClick={() => setIsClientOpen(!isClientOpen)} className="collapsible-button">
          Clients
        </button>
        {isClientOpen && (
          <div className="collapsible-content">
            <p><strong>Terms and Conditions for Clients of The Learning Zone</strong></p>
            <p><strong>Consent on Collection, Usage & Disclosure of Personal Data</strong></p>
            <p>
              By submitting your contact details to The Learning Zone, you agree that The Learning Zone may collect, use and disclose your personal data obtained by our organisation for the following purposes in accordance with the Personal Data Protection Act 2012:
            </p>
            <ul>
              <li>you may be contacted via any messaging platform or phone call regarding your tuition request</li>
              <li>your details may be utilised in the administrative process of a tutor search</li>
              <li>your details will be provided to the respective tutor upon confirmation of a tuition lesson</li>
              <li>you may receive tuition-related marketing messages via messaging platforms (not limited to WhatsApp, Telegram)</li>
            </ul>
            <p><strong>Acceptance of Terms and Conditions</strong></p>
            <p>
              By engaging a tutor from The Learning Zone, you accept the Terms and Conditions listed below with regards to the tuition service provided. Your engagement with The Learning Zone is formalised when a Confirmation Note has been sent to you via Telegram/Whatsapp, or/and when the respective tutor has conducted the first tuition lesson with you as arranged.
            </p>
            <p><strong>Payment</strong></p>
            <p>
              Lesson fees with any of The Learning Zone tutors are to be paid via Bank Transfer, PayNow, or PayLah to The Learning Zone directly and not to the tutors. Any additional tuition services such as an additional subject or teaching of the student’s siblings must be disclosed to The Learning Zone.
            </p>
            <p><strong>Late Payment</strong></p>
            <p>
              The Learning Zone reserves the right to impose a late-payment fee for overdue fees of 1 month or more. The late-payment fees after 1 month will be $50 per week (7 Days) of overdue payment after the 1st month of grace period. Should additional administrative fees be required to recover the late-payments, The Learning Zone shall charge this to the client accordingly.
            </p>
            {/* More client terms content here */}
          </div>
        )}
      </div>
  
      {/* Tutors Section */}
      <div className="collapsible-section">
        <button onClick={() => setIsTutorOpen(!isTutorOpen)} className="collapsible-button">
          Tutors
        </button>
        {isTutorOpen && (
          <div className="collapsible-content">
            <p><strong>Terms and Conditions for Tutors of The Learning Zone</strong></p>
            <p><strong>Consent on Collection, Usage & Disclosure of Personal Data</strong></p>
            <p>
              By registering as a tutor with The Learning Zone, you agree that The Learning Zone may collect, use and disclose your personal data obtained by our organisation for the following purposes in accordance with the Personal Data Protection Act 2012:
            </p>
            <ul>
              <li>your tutor profile will be provided to our clients via messaging platforms (not limited to WhatsApp, Telegram) when you have indicated your interest in the assignment.</li>
              <li>your mobile number/contact details will be provided to the respective client upon the clients’ interest.</li>
              <li>your personal information will be utilised by The Learning Zone to receive tutor-related marketing messages via messaging platforms (not limited to WhatsApp, Telegram).</li>
            </ul>
            <p>
              If you would like to withdraw your consent to the collection of this data at any given point of time, do Telegram us at @thelearningzonetc.
            </p>
            <p><strong>Acceptance of Terms and Conditions</strong></p>
            <p>
              By registering as a tutor with The Learning Zone, or accepting a tuition assignment from The Learning Zone, you accept the Terms and Conditions listed below with regards to the tuition matching service provided. Your engagement with The Learning Zone is formalised when a Confirmation Note has been sent to you via Telegram/Whatsapp, or/and when you have conducted the first tuition lesson as arranged with the respective client.
            </p>
            <p><strong>General Terms for Lesson Conduct</strong></p>
            <ul>
              <li>Tutors are expected to keep to the agreed rates and timeslots fixed. Any changes are to be mutually agreed by the client.</li>
              <li>Tutors are expected to be aware of the location of the lessons and have planned their transport arrangements before accepting any assignment.</li>
              <li>Tutors are strictly expected to conduct lessons in their own capacity, and not send any form of representative or substitute personnel on behalf of him/her.</li>
              <li>Tutors are expected to conduct themselves in a professional and ethical manner throughout the tenure of the tuition assignment.</li>
              <li>Tutors are expected to practice punctuality and not to short-change any timing in tuition lessons.</li>
            </ul>
            {/* More tutor terms content here */}
          </div>
        )}
      </div>
    </div>
  );  
};

export default TermsAndConditionsPage;
