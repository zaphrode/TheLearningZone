import React, { useState } from "react";
import "./TestimonialsAndQualificationsPage.css";

const TestimonialsAndQualifications = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Array of image file paths for testimonials and qualifications
  const testimonials = [
    "/testimonials/testimonial1.png",
  ];

  const qualifications = [
    "/qualifications/qualification1.png",
  ];

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      {/* Testimonials Section */}
      <div className="gallery-section">
        <h2 className="gallery-title">Testimonials</h2>
        <div className="gallery-grid">
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
        <div className="gallery-grid">
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

export default TestimonialsAndQualifications;
