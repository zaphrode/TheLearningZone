// frontend/src/pages/TutorProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TutorProfilePage.css';

const TutorProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tutor-profiles/${id}`, { withCredentials: true });
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching tutor profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="tutor-profile-page">
      <h1>{profile.name}'s Profile</h1>
      <div className="profile-container">
        <div className="profile-picture-container">
          <img 
            src={
              profile.picture 
                ? `http://localhost:3001/uploads/${profile.picture}`
                : `http://localhost:3001/uploads/${profile.gender === "female" ? "female_avatar.jpg" : "male_avatar.png"}`
            } 
            alt="Profile" 
            className="profile-picture" 
          />
        </div>
        
        <div className="profile-details">
          <p><strong>Age:</strong> {profile.age || "Not specified"}</p>
          <p><strong>Gender:</strong> {profile.gender || "Not specified"}</p>
          <p><strong>Subjects taught:</strong> {profile.subjects ? profile.subjects.join(', ') : "Not specified"}</p>
          <p><strong>Bio:</strong></p>
          <ul className="bio-list">
            {profile.bio ? profile.bio.split('\n').map((line, index) => (
              <li key={index}>{line}</li>
            )) : <p>Not specified</p>}
          </ul>
          <p><strong>Preferred Locations:</strong> {profile.preferredLocations ? profile.preferredLocations.join(', ') : "Not specified"}</p>
          <p><strong>Availability:</strong> {profile.availability || "Not specified"}</p>
        </div>
      </div>

      <h2>Qualifications</h2>
      <div className="qualifications-section">
        {profile.qualifications && profile.qualifications.length > 0 ? (
          profile.qualifications.map((file, index) => (
            <img key={index} src={`http://localhost:3001/uploads/${file}`} alt={`Qualification ${index + 1}`} className="qualification-img" />
          ))
        ) : (
          <p>No qualifications available.</p>
        )}
      </div>

      <h2>Testimonials</h2>
      <div className="testimonials-section">
        {profile.testimonials && profile.testimonials.length > 0 ? (
          profile.testimonials.map((file, index) => (
            <img key={index} src={`http://localhost:3001/uploads/${file}`} alt={`Testimonial ${index + 1}`} className="testimonial-img" />
          ))
        ) : (
          <p>No testimonials available.</p>
        )}
      </div>
    </div>
  );
};

export default TutorProfilePage;
