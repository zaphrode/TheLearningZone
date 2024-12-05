import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./TestimonialsAndQualificationsPage.css";

const TestimonialsAndQualificationsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Array of image file paths for testimonials and qualifications
  const testimonials = [
    "/testimonials/testimonial1.jpg",
    "/testimonials/testimonial2.jpg",
    "/testimonials/testimonial3.jpg",
    "/testimonials/testimonial4.jpg",
    "/testimonials/testimonial5.jpg",
    "/testimonials/testimonial6.jpg",
    "/testimonials/testimonial7.jpg",
  ];

  const qualifications = [
    "/qualifications/qualification1.jpg",
    "/qualifications/qualification2.jpg",
    "/qualifications/qualification3.jpg",
    "/qualifications/qualification4.jpg",
    "/qualifications/qualification5.jpg",
    "/qualifications/qualification6.jpg",
    "/qualifications/qualification7.jpg",
  ];
  const navigate = useNavigate();

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Function to navigate back to the homepage
  const handleBackClick = () => {
    navigate("/home"); // Navigate to the homepage
  };

  return (
    
    <div className="gallery-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>

      {/* Automatic concentric rings */}
      <div className="automatic-rings">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="automatic-ring"></div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="gallery-section">
        <h2 className="gallery-title">Testimonials</h2>
        <div className="gallery-belt">
          {testimonials.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Testimonial ${index + 1}`}
              className="gallery-image"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Qualifications Section */}
      <div className="gallery-section">
        <h2 className="gallery-title">Qualifications</h2>
        <div className="gallery-belt">
          {qualifications.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Qualification ${index + 1}`}
              className="gallery-image"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="Enlarged View" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsAndQualificationsPage;
