// frontend/src/pages/SignupPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

export default function SignupPage() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/home'); // Navigate to the home page
    };

    return (
        <div className="signup-page">
            {/* Back Button */}
            <button className="back-button" onClick={handleBackClick}>
                ← Back
            </button>

            <div className="signup-container">
                {/* Header */}
                <header className="signup-header">
                    <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
                    <h1 className="header-title">Hi Future Tutor !</h1>
                    <p className="header-subtitle">Welcome to The Learning Zone! 🎓</p>
                </header>

                {/* Rates Section */}
                <div className="signup-content">
                    <p className="important-text">Our rates are:</p>
                    <ul className="rates-list">
                        <li><strong>Primary:</strong> $25 - $30/h</li>
                        <li><strong>Lower Sec:</strong> $30 - $35/h</li>
                        <li><strong>Upper Sec:</strong> $35 - $40/h</li>
                    </ul>

                    {/* Call to Action */}
                    <p>
                        <strong>Message our admin on Telegram: </strong>
                        <a
                            href="https://t.me/Thelearningzonetc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="telegram-link"
                        >
                            @Thelearningzonetc
                        </a>
                    </p>

                    {/* Instructions Section */}
                    <p>If you are interested, do create your tutor profile in this format: </p>
                    <p>(Please list in point form with a '-')</p>
                    <div className="tutor-profile-format">
                        <p><strong>Tutor K: (Name, e.g.Kyler)</strong></p>
                        <ul>
                            <li>If you are an undergraduate, do state your degree pursuit and school.</li>
                            <li>If you are a JC/IB/Poly student, do state your school and year.</li>
                            <li>Any tutoring experience (elaborate on duration and subject, more importantly - notable tutoring accomplishments such as tutee improvements or notable grades).</li>
                            <li>Any notable A level/Poly/IB grades (Do include your RP/GPA).</li>
                            <li>Any notable O level/IP grades.</li>
                            <li>Telegram handle</li>
                            <li>WhatsApp Number</li>
                            <li>Preferred Subjects to teach</li>
                            <li>Preferred Locations to teach</li>
                            <li>Age</li>
                            <li>Gender</li>
                        </ul>
                    </div>
                <p><strong>We will revert to you within 3 days if you are selected :)</strong></p>
                </div>
            </div>
        </div>
    );
}
