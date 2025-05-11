// frontend/src/pages/SignupPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignupPage.css';

export default function SignupPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('part-time'); // Default to part-time tab

    const handleBackClick = () => {
        navigate('/home'); // Navigate to the home page
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
                    </Link>
                    <h1 className="header-title">Hi Future Tutor!</h1>
                    <p className="header-subtitle">Welcome to The Learning Zone! 🎓</p>
                </header>

                {/* Tab Selector */}
                <div className="tutor-type-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'part-time' ? 'active' : ''}`} 
                        onClick={() => handleTabChange('part-time')}
                    >
                        Part-Time Tutor
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'full-time' ? 'active' : ''}`} 
                        onClick={() => handleTabChange('full-time')}
                    >
                        Full-Time Tutor
                    </button>
                </div>

                {/* Part-Time Tutor Template */}
                {activeTab === 'part-time' && (
                    <div className="signup-content">
                        <h2>Part-Time Tutor Application</h2>
                        
                        <p className="important-text">Our rates are:</p>
                        <ul className="rates-list">
                            <li><strong>Primary:</strong> $25-$30/h</li>
                            <li><strong>Lower Sec:</strong> $30-$35/h</li>
                            <li><strong>Upper Sec:</strong> $35-$40/h</li>
                        </ul>

                        <p>We are a tuition agency looking for 1-1 home tutors and expect a minimum commitment period of 4 months when taking on assignments (usually 1.5/2 hours, once/twice a week - depending on the client)</p>

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
                        <p>Kindly create your tutor profile in the format below if you would like to be considered:</p>
                        <p>(Please list in bullet point form, and remove our guiding questions)</p>
                        
                        <div className="tutor-profile-format">
                            <p><strong>Part-Time Tutor Profile Format:</strong></p>
                            <ul>
                                <li>Your Name</li>
                                <li>If you are an undergraduate, do state your degree pursuit and school</li>
                                <li>If you are a jc/ib/poly student, do state your school and year</li>
                                <li>Tutoring experience, siblings and friends included<br/>
                                    (elaborate on duration, subjects, and tutoring accomplishments such as any tutee improvements or notable grades attained)</li>
                            </ul>
                            
                            <p><strong>Examples of tutoring experience elaboration:</strong></p>
                            <ul>
                                <li>(i) 2 years tutoring experience, Secondary (EMath & AMath) and Primary level (science). Tutee went from D7 to A1 for O Level Maths in 4 months (testimonials can be provided)</li>
                                <li>(ii) 85% of the students who I taught saw massive improvement in their science and math grades. I have mentored a total of X students in my Y years of teaching experience.</li>
                            </ul>
                            
                            <p><strong>Tutoring methods (Compulsory if you do not have tutoring experience)</strong></p>
                            <p>Example:</p>
                            <p>For Math, I use practice questions to go through with students how a certain formula is applied or to help students understand the problem better through explanation. I sometimes use videos for students who prefer a more visual approach in learning.</p>
                            
                            <p><strong>Additional Information Required:</strong></p>
                            <ul>
                                <li>A level RP/ Poly GPA/ IB score (Do include your grade for respective subjects)</li>
                                <li>Notable O level / IP grades (A1/A2)</li>
                                <li>PSLE results and grades (e.g. 261/AAAA*)</li>
                                <li>Any other relevant information you would like to make note of (e.g. school achievements)</li>
                                <li>Telegram handle</li>
                                <li>WhatsApp Number</li>
                                <li>Preferred Subjects to teach</li>
                                <li>Preferred Locations to teach</li>
                                <li>Age in 2025</li>
                                <li>Gender</li>
                            </ul>
                        </div>
                        
                        <p><strong>We appreciate your interest and will revert to you within 1-3 days if you are selected!</strong></p>
                    </div>
                )}

                {/* Full-Time Tutor Template */}
                {activeTab === 'full-time' && (
                    <div className="signup-content">
                        <h2>Full-Time Tutor Application</h2>
                        
                        <p className="important-text">Do quote us your rates for the respective levels (Secondary/Primary)</p>
                        
                        <p>We are a tuition agency looking for 1-1 home tutors and expect a minimum commitment period of 4 months (usually 1.5/2 hours, once/twice a week - depending on the client)</p>

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
                        <p>If you are interested, kindly create your tutor profile in the format below:</p>
                        <p>(Please give your answers in bullet point form without the guiding questions)</p>
                        
                        <div className="tutor-profile-format">
                            <p><strong>Full-Time Tutor Profile Format:</strong></p>
                            <ul>
                                <li>Your Name</li>
                                <li>Elaborate on your tutoring experience<br/>
                                    (duration and subject, more importantly - notable tutoring accomplishments such as any tutee improvements or notable grades attained)</li>
                            </ul>
                            
                            <p><strong>Examples of tutoring experience elaboration:</strong></p>
                            <p>5 years tutoring experience, Secondary (EMath & AMath) and Primary level (science). Tutee went from D7 to A1 for O Level Maths in 4 months (testimonials can be provided)</p>
                            
                            <p><strong>Any other relevant information (e.g. tutoring methods, school achievements, accomplishments)</strong></p>
                            <p>Examples:</p>
                            <ul>
                                <li>(i) For Math, I use practice questions to go through with students how a certain formula is applied or to help students understand the problem better through explanation. I sometimes use videos for students who prefer a more visual approach in learning.</li>
                                <li>(ii) 85% of the students who I taught saw massive improvement in their science and math grades. I have mentored a total of 25 students in my 4 years of teaching experience. I also have a cousin whom I regularly tutor every weekend. He went from a normal academic stream to an express stream thanks to my tutoring.</li>
                            </ul>
                            
                            <p><strong>Additional Information Required:</strong></p>
                            <ul>
                                <li>If you are a university graduate, do let us know your degree and school</li>
                                <li>If you are an undergraduate, do state your degree pursuit and school</li>
                                <li>A level RP/ Poly GPA/ IB score (Do include your grade for respective subjects)</li>
                                <li>Notable O level / IP grades (A1/A2)</li>
                                <li>Telegram handle</li>
                                <li>WhatsApp Number</li>
                                <li>Preferred Subjects to teach</li>
                                <li>Preferred Locations to teach</li>
                                <li>Age in 2025</li>
                                <li>Gender</li>
                            </ul>
                        </div>
                        
                        <p><strong>We appreciate your interest and will revert to you within 1-3 days if you are selected!</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
}
