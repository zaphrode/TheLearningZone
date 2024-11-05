// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
  console.log("Environment Variables:");
  console.log("DB_URL:", process.env.DB_URL ? "Loaded" : "Not Loaded");
  console.log("SECRET:", process.env.SECRET ? "Loaded" : "Not Loaded");
  console.log("PORT:", process.env.PORT || 3001);
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const tutorProfilesController = require("./controllers/tutorProfilesController");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://the-learning-zone.vercel.app'  // Production frontend
    : 'http://localhost:3000',                 // Development frontend
  credentials: true,
};
console.log("CORS setup:", corsOptions);
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

app.post("/tutor-profiles", requireAuth, upload.fields([
  { name: 'picture', maxCount: 1 },
  { name: 'qualifications', maxCount: 10 },
  { name: 'testimonials', maxCount: 10 }
]), tutorProfilesController.createTutorProfile);

app.put("/tutor-profiles/:id", requireAuth, upload.fields([
  { name: 'picture', maxCount: 1 },
  { name: 'qualifications', maxCount: 10 },
  { name: 'testimonials', maxCount: 10 }
]), tutorProfilesController.updateTutorProfile);

app.delete("/tutor-profiles/:id", requireAuth, tutorProfilesController.deleteTutorProfile);


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
