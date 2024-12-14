// frontend/src/pages/SignupPage.js
import React from 'react';
import './SignupPage.css';

export default function SignupPage() {
    return (
        <div className="signup-page">
            <div className="signup-container">
                <header className="signup-header">
                    <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
                    <h1>Hi Future Tutor</h1>
                </header>

                <div className="signup-content">
                    <p>Our rates are:</p>
                    <ul className="rates-list">
                        <li><strong>Primary:</strong> $25-$30/h</li>
                        <li><strong>Lower Sec:</strong> $30-$35/h</li>
                        <li><strong>Upper Sec:</strong> $35-$40/h</li>
                    </ul>

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

                    <p>Please send your tutor profile in this format (list in point form):</p>
                    <div className="tutor-profile-format">
                        <p><strong>Tutor K: (Kyler)</strong></p>
                        <ul>
                            <li>If you are an undergraduate, do state your degree pursuit and school</li>
                            <li>If you are a JC student, do state your school and year</li>
                            <li>Age</li>
                            <li>Any tutoring experience (duration and subject, can include siblings)</li>
                            <li>Any notable A level/ Poly grades (Do include your RP/GPA)</li>
                            <li>Any notable O level grades</li>
                            <li>Any notable tutoring accomplishments</li>
                            <li>Telegram handle</li>
                            <li>WhatsApp Number</li>
                            <li>Preferred Subjects to teach</li>
                            <li>Preferred Locations to teach</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
