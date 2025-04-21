// frontend/src/components/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for redirection
import { HelmetProvider } from 'react-helmet-async';
import HomePage from "../pages/HomePage";
import TutorHome from "../pages/TutorHomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import FindTutorsPage from "../pages/FindTutorsPage";
import TutorProfilePage from '../pages/TutorProfilePage';
import ResourcesPage from "../pages/ResourcesPage";
import WhoAreWePage from '../pages/WhoAreWePage';
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage';
import TestimonialsAndQualificationsPage from "../pages/TestimonialsAndQualificationsPage";
import BlogPage from "../pages/BlogPage";
import BlogPost from "../pages/BlogPost";
import AIChatPage from "../pages/AIChatPage";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Default Route that redirects to /home */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Main Home Page */}
            <Route path="/home" element={<HomePage />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* AI Chat Route */}
            <Route path="/ai-chat" element={<AIChatPage />} />

            {/* Other Routes */}
            <Route path="/tutor-home" element={<TutorHome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/testimonials-and-qualifications" element={<TestimonialsAndQualificationsPage />} />
            <Route path="/tutor/:id" element={<TutorProfilePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/who-are-we" element={<WhoAreWePage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            {/* Optional: Add a 404 Not Found Page */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
