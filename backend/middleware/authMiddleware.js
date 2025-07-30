const jwt = require("jsonwebtoken");
const db = require("../db"); // jei reikia blacklist'o

module.exports = async  (req, res, next) => {
  const token = req.cookies.jwt; // <-- naudok cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Patikrina ar token ne juodajame sąraše
    const result = await db.query("SELECT * FROM blacklisted_tokens WHERE token = $1", [token]);
    if (result.rows.length > 0) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
