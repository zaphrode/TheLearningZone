import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FindTutorsPage.css';

const FindTutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tutor-profiles", { withCredentials: true });
        setTutors(response.data.profiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setError("Failed to load tutors.");
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="find-tutors-page">
      <h1>Find a Tutor</h1>
      <div className="tutor-list">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div className="tutor-card" key={tutor._id}>
              <img 
                src={
                  tutor.picture 
                    ? `http://localhost:3001/uploads/${tutor.picture}`
                    : `http://localhost:3001/uploads/${tutor.gender?.toLowerCase() === "female" ? "female_avatar.jpg" : "male_avatar.png"}`
                } 
                alt="Profile" 
                className="tutor-picture" 
              />
              <div className="tutor-info">
                <h2>{tutor.name}</h2>
                <p><strong>ID:</strong> {tutor.tutorId || "ID not provided"}</p>
                
                {/* Display bio as a list */}
                <ul className="bio-list">
                  {tutor.bio.split('\n').map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>

                <Link to={`/tutor/${tutor._id}`} className="view-profile">View Profile</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No tutors found.</p>
        )}
      </div>
    </div>
  );
};

export default FindTutorsPage;
