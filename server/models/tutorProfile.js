// server/models/tutorProfile.js
const mongoose = require("mongoose");

const tutorProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  bio: { type: String, required: true },
  age: { type: Number }, // Add age
  gender: { type: String }, // Add gender
  preferredLocation: { type: String }, // Add preferred location
  availability: { type: String }, // Add availability
  qualifications: [{ type: String }], // Array of qualifications
  testimonials: [{ type: String }], // Array of testimonials (storing image filenames)
  picture: { type: String }, // Store profile picture filename
  tutorId: { type: String, unique: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;

