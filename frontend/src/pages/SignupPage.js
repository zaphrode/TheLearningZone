// frontend/src/pages/SignupPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import './SignupPage.css';

export default function SignupPage() {
    return (
        <div className="signup-page">
            <div className="signup-container">
                <header className="signup-header">
                    <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
                    <h1>Join The Learning Zone</h1>
                    <p className="header-text">Create your account to start teaching today!</p>
                </header>
                
                <SignupForm />

                <p className="already-account">
                    Already have an account?{' '}
                    <Link to="/login" className="login-link">Login</Link>
                </p>
            </div>
        </div>
    );
}
