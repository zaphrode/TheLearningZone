import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import authStore from "../stores/authStore";

export default function LogoutPage() {
  const store = authStore();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Perform the logout when the component mounts
  useEffect(() => {
    store.logout(); // Call the logout function from the store
  }, []);

  // Handler function to navigate to home
  const handleReturnHome = () => {
    navigate("/home"); // Navigate to the home page when clicked
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>You are now logged out</h1>
      {/* Button to return back to home page */}
      <button 
        onClick={handleReturnHome} 
        style={{
          padding: "15px 30px",
          borderRadius: "10px",
          backgroundColor: "#00C0FF", // Use the same blue color from the logo
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          marginTop: "20px",
        }}
      >
        Return to Home
      </button>
    </div>
  );
}
