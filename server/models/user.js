// server/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  tutorProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "TutorProfile" }], // Change notes to tutorProfiles
});

const User = mongoose.model("User", userSchema);

module.exports = User;
