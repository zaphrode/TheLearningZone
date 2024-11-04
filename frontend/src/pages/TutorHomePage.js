import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TutorHomePage.css';

function TutorHome() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureName, setPictureName] = useState(""); 
  const [qualifications, setQualifications] = useState([]); 
  const [testimonials, setTestimonials] = useState([]); 
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);
    formData.append("bio", bio);
    formData.append("picture", picture);
    qualifications.forEach(file => formData.append("qualifications", file));
    testimonials.forEach(file => formData.append("testimonials", file));

    try {
      const response = await axios.post("http://localhost:3001/tutor-profiles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (response.data.success) {
        setMessage("Profile created successfully!");
        setName(""); setNumber(""); setBio(""); setPicture(null); setPictureName("");
        setQualifications([]); setTestimonials([]);
      } else {
        setMessage("Failed to create profile. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while creating the profile.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPictureName(file ? file.name : ""); 
  };

  const handleBackToHome = () => navigate('/home'); 
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed.");
    }
  };

  return (
    <div className="tutor-home-container">
      <div className="title-section">
        <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
        <h1>Welcome to the Tutor Home Page</h1>
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit} className="profile-form">
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Number:</label>
            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
          </div>
          <div>
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
          </div>
          <div className="picture-input">
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div>
              <label>Qualifications (Multiple files allowed):</label>
              <input type="file" multiple onChange={(e) => setQualifications([...e.target.files])} />
            </div>
            <div>
              <label>Testimonials (Multiple files allowed):</label>
              <input type="file" multiple onChange={(e) => setTestimonials([...e.target.files])} />
            </div>

            {pictureName && <p className="picture-name">{pictureName}</p>}
          </div>
          <button type="submit" className="update-button">Update Profile</button>
        </form>
        {message && <p>{message}</p>}

        <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TutorHome;
