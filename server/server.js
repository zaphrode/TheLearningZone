// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const tutorProfilesController = require("./controllers/tutorProfilesController");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" }); // Setup multer for file uploads
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'http://the-learning-zone.vercel.app'  // Production frontend
    : 'http://localhost:3000',                   // Development frontend
  credentials: true,
};
app.use(cors(corsOptions));

// Serve the uploads folder as static so frontend can access uploaded files
app.use('/uploads', express.static('uploads'));

// Connect to database
connectToDb();

// Routing
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/tutor-profiles", requireAuth, tutorProfilesController.fetchTutorProfiles);
app.get("/tutor-profiles/:id", requireAuth, tutorProfilesController.fetchTutorProfile);

// Handle multiple file uploads: picture, qualifications, testimonials
app.post("/tutor-profiles", requireAuth, upload.fields([
{ name: 'picture', maxCount: 1 },            // Single profile picture
{ name: 'qualifications', maxCount: 10 },    // Up to 10 qualification files
{ name: 'testimonials', maxCount: 10 }       // Up to 10 testimonial files
]), tutorProfilesController.createTutorProfile);

// Update profile, allowing multiple files for qualifications and testimonials
app.put("/tutor-profiles/:id", requireAuth, upload.fields([
  { name: 'picture', maxCount: 1 },            // Single profile picture
  { name: 'qualifications', maxCount: 10 },    // Up to 10 qualification files
  { name: 'testimonials', maxCount: 10 }       // Up to 10 testimonial files
]), tutorProfilesController.updateTutorProfile);


app.delete("/tutor-profiles/:id", requireAuth, tutorProfilesController.deleteTutorProfile);

const PORT = process.env.PORT || 3001; // Set a default port if PORT is not defined
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
