const jwt = require("jsonwebtoken");
const db = require("../db");

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const result = await db.query(
      "SELECT * FROM blacklisted_tokens WHERE token = $1",
      [token]
    );
    const rows = Array.isArray(result) ? result : result.rows;

    if (rows.length > 0) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
