// server/models/tutorProfile.js
const mongoose = require("mongoose");

const tutorProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  bio: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  preferredLocations: [{ type: String }], // Change to an array to support multiple locations
  availability: { type: String },
  qualifications: [{ type: String }],
  testimonials: [{ type: String }],
  picture: { type: String },
  subjects: [{ type: String }],
  tutorId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);


module.exports = TutorProfile;

