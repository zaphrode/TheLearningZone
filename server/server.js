const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const helmet = require("helmet"); // Additional security headers
const connectToDb = require("./config/connectToDb");
const tutorProfilesController = require("./controllers/tutorProfilesController");
const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads/" });
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

const path = '/tmp/uploads';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

const app = express();

// Set security headers
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL  // Set this as environment variable for flexibility
    : 'http://localhost:3000',
  credentials: true,
};
console.log("CORS setup:", corsOptions);
app.use(cors(corsOptions));

// Other configurations
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('/tmp/uploads'));

// Connect to database with confirmation log
connectToDb()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection failed:", err));

// Routes
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
app.get("/tutor-profiles", requireAuth, tutorProfilesController.fetchTutorProfiles);
app.get("/tutor-profiles/:id", requireAuth, tutorProfilesController.fetchTutorProfile);
app.get('/uploads/:filename', tutorProfilesController.serveFile);
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
