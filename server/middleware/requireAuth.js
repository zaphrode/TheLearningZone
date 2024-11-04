// /middleware/requireAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    console.log("Checking authorization...");
    const token = req.cookies.Authorization;
    console.log("Token:", token ? "Present" : "Not present");

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("Token decoded:", decoded);

    if (Date.now() > decoded.exp) return res.sendStatus(401);

    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);

    req.user = user;
    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res.sendStatus(401);
  }
}

module.exports = requireAuth;
