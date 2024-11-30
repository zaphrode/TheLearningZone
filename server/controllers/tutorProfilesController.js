const TutorProfile = require('../models/tutorProfile');
const User = require("../models/user");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Use /tmp/uploads for temporary storage in Vercel
const upload = multer({ dest: '/tmp/uploads' });

// Ensure /tmp/uploads exists
if (!fs.existsSync('/tmp/uploads')) {
  fs.mkdirSync('/tmp/uploads', { recursive: true });
}

// Fetch all tutor profiles for the logged-in user
const fetchTutorProfiles = async (req, res) => {
  try {
    const { gender, location, subject } = req.query;
    const filter = {};

    if (gender) filter.gender = gender;
    if (location) filter.preferredLocations = { $in: [location] };
    if (subject) filter.subjects = subject;

    const profiles = await TutorProfile.find(filter, 'name bio picture tutorId gender preferredLocations subjects');
    res.json({ success: true, profiles });
  } catch (err) {
    console.error("Error fetching tutor profiles:", err);
    res.sendStatus(400);
  }
};

const serveFile = (req, res) => {
  const filePath = path.join('/tmp/uploads', req.params.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found:", err);
      return res.status(404).send("File not found");
    }
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendFile(filePath);
  });
};


// Fetch a single tutor profile by ID
const fetchTutorProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await TutorProfile.findById(profileId);
    
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    
    res.json({ success: true, profile });
  } catch (err) {
    console.error("Error fetching tutor profile:", err);
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};

// Create a new tutor profile
const createTutorProfile = async (req, res) => {
  try {
    const {
      name,
      number,
      bio,
      age,
      gender,
      preferredLocations,
      availability,
      qualifications,
      testimonials,
      tutorId,
      subjects
    } = req.body;

    let picture = req.file ? req.file.filename : null;
    if (!picture) {
      picture = gender === 'male' ? 'male_avatar.png' : 'female_avatar.jpg';
    }

    const profile = await TutorProfile.create({
      tutorId,
      name,
      number,
      bio,
      age,
      gender,
      preferredLocations: Array.isArray(preferredLocations) ? preferredLocations : preferredLocations.split(',').map(loc => loc.trim()),
      availability,
      qualifications,
      testimonials,
      picture,
      user: req.user._id,
      subjects: subjects ? subjects.split(',').map(s => s.trim()) : []
    });

    res.status(201).json({ success: true, message: "Tutor profile created successfully.", profile });
  } catch (err) {
    console.error("Error creating tutor profile:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Update an existing tutor profile
const updateTutorProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const { name, number, bio, age, gender, preferredLocations, availability, tutorId, subjects } = req.body;

    const picture = req.files?.picture ? req.files.picture[0].filename : null;
    const newQualifications = req.files?.qualifications ? req.files.qualifications.map(file => file.filename) : [];
    const newTestimonials = req.files?.testimonials ? req.files.testimonials.map(file => file.filename) : [];

    const profile = await TutorProfile.findOne({ _id: profileId, user: req.user._id });

    if (!profile) return res.status(404).json({ success: false, message: "Profile not found." });

    if (name) profile.name = name;
    if (number) profile.number = number;
    if (bio) profile.bio = bio;
    if (age) profile.age = age;
    if (gender) profile.gender = gender;
    if (preferredLocations) {
      profile.preferredLocations = Array.isArray(preferredLocations) ? preferredLocations : preferredLocations.split(',').map(loc => loc.trim());
    }
    if (availability) profile.availability = availability;
    if (picture) profile.picture = picture;
    if (tutorId) profile.tutorId = tutorId;

    if (subjects) {
      profile.subjects = Array.isArray(subjects) ? subjects : subjects.split(',').map(s => s.trim());
    }

    profile.qualifications = [...profile.qualifications, ...newQualifications];
    profile.testimonials = [...profile.testimonials, ...newTestimonials];

    await profile.save();

    res.json({ success: true, profile });
  } catch (err) {
    console.error("Error updating tutor profile:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Delete a tutor profile
const deleteTutorProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    await TutorProfile.deleteOne({ _id: profileId, user: req.user._id });
    await User.findByIdAndUpdate(req.user._id, { $pull: { tutorProfiles: profileId } });
    res.json({ success: "Tutor profile deleted" });
  } catch (err) {
    console.error("Error deleting tutor profile:", err);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchTutorProfiles,
  fetchTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
  serveFile // Export the file serving function
};
