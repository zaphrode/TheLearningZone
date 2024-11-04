const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
  try {
      const { email, password } = req.body;

      // Server-side validation for password complexity
      if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password) || password.length < 8) {
          return res.status(400).json({ success: false, message: "Password does not meet complexity requirements." });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ success: false, message: "Email already in use." });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 8);

      // Create a user with data
      const newUser = await User.create({ email, password: hashedPassword });

      console.log("User created successfully:", newUser); // Debugging log

      // Respond with success message
      res.status(200).json({ success: true, message: "Signup successful." });
  } catch (err) {
      console.error("Signup error:", err); // Log error details
      res.status(500).json({ success: false, message: "Internal server error." });
  }
}


async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      console.log("Login request received with email:", email); // Log incoming request
  
      // Find the user by email
      const user = await User.findOne({ email });
      console.log("Found user in database:", user ? user.email : "User not found"); // Log if user is found
  
      if (!user) {
        console.log("Invalid email. User not found.");
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      // Compare passwords
      const passwordMatch = bcrypt.compareSync(password, user.password);
      console.log("Password match result:", passwordMatch); // Log password comparison result
  
      if (!passwordMatch) {
        console.log("Invalid password.");
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      // Create JWT token and set cookie
      const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // Token expiration: 30 days
      const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
      res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production",
      });
  
      console.log("Login successful. JWT token created and cookie set."); // Log success
      return res.status(200).json({ success: true, message: "Login successful", user });
    } catch (err) {
      console.error("Login error:", err); // Log any errors
      return res.status(400).json({ success: false, message: "Login failed" });
    }
  }
  
  

function logout(req,res) {
    try{
        res.clearCookie("Authorization");
        res.sendStatus(200);
    }
    catch(err)
    {
        console.log(err)
        res.sendStatus(400);
    }
}

function checkAuth(req, res)
{
    try{
        res.sendStatus(200);
    }
    catch(err)
    {
        return res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
};