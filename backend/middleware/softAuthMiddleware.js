const jwt = require("jsonwebtoken");
const db = require("../db");

const softAuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.jwt || req.headers["authorization"]?.split(" ")[1];

  if (token) {
    try {
      const result = await db.query(
        "SELECT * FROM blacklisted_tokens WHERE token = $1",
        [token]
      );
      const rows = Array.isArray(result) ? result : result.rows;

      if (rows.length === 0) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } else {
        console.warn("Token in blacklist, user not attached");
      }
    } catch (err) {
      console.warn("Soft auth invalid token:", err.message);
    }
  }

  next();
};

module.exports = softAuthMiddleware;
