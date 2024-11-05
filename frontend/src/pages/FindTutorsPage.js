import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FindTutorsPage.css';

const FindTutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tutor-profiles`, { withCredentials: true });
        setTutors(response.data.profiles);
        setFilteredTutors(response.data.profiles); // Initialize filteredTutors
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setError("Failed to load tutors.");
        setLoading(false); // Ensure loading is false in error case too
      }
    };
    fetchTutors();
  }, [apiUrl]);

  // Automatically filter tutors whenever a filter changes
  useEffect(() => {
    filterTutors();
  }, [genderFilter, locationFilter, subjectFilter]);

  // Filter function
  const filterTutors = () => {
    let updatedTutors = tutors;

    // Filter by gender
    if (genderFilter) {
      updatedTutors = updatedTutors.filter(tutor => tutor.gender === genderFilter);
    }

    // Filter by location
    if (locationFilter) {
      updatedTutors = updatedTutors.filter(tutor => tutor.preferredLocations?.includes(locationFilter));
    }

    // Filter by subject
    if (subjectFilter) {
      updatedTutors = updatedTutors.filter(tutor => tutor.subjects?.includes(subjectFilter));
    }

    setFilteredTutors(updatedTutors);
  };

  // Handle changes in filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "gender") setGenderFilter(value);
    if (name === "location") setLocationFilter(value);
    if (name === "subject") setSubjectFilter(value);
  };

  // Function to open WhatsApp chat
  const openWhatsAppChat = () => {
    window.open("https://wa.me/6591684367", "_blank");
  };

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="find-tutors-page">
      <h1>Find a Tutor</h1>

      {/* WhatsApp Button */}
      <div className="whatsapp-button" onClick={openWhatsAppChat}>
        <img src="/whatsapp-logo2.png" alt="WhatsApp" className="whatsapp-logo" />
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select name="gender" value={genderFilter} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select name="location" value={locationFilter} onChange={handleFilterChange}>
          <option value="">All Locations</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Central">Central</option>
          <option value="North-East">North-East</option>
          <option value="North-West">North-West</option> 
          <option value="South-East">South-East</option>
          <option value="South-West">South-West</option>
        </select>

        <select name="subject" value={subjectFilter} onChange={handleFilterChange}>
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          {/* Add other subjects as needed */}
        </select>
      </div>

      <div className="tutor-list">
        {filteredTutors && filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div className="tutor-card" key={tutor._id}>
              <div className="tutor-header">
                <img 
                  src={
                    tutor.picture 
                      ? `${apiUrl}/uploads/${tutor.picture}`
                      : `/assets/${tutor.gender?.toLowerCase() === "female" ? "female_avatar.png" : "male_avatar.png"}`
                  } 
                  alt="Profile" 
                  className="tutor-picture" 
                />
                <div className="tutor-info">
                  <h2>{tutor.name}</h2>
                  <p><strong>ID:</strong> {tutor.tutorId || "ID not provided"}</p>
                </div>
              </div>
              <ul className="bio-list">
                {(tutor.bio ? tutor.bio.split('\n') : []).map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              <Link to={`/tutor/${tutor._id}`} className="view-profile">View Profile</Link>
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
