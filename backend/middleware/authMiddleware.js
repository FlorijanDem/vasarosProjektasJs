const jwt = require("jsonwebtoken");
const db = require("../db");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Tikrinam ar token yra juodajame sąraše
    const result = await db.query(
      "SELECT id FROM blacklisted_tokens WHERE token = $1 LIMIT 1",
      [token]
    );

    if (result.rows.length > 0) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
