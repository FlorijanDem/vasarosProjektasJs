const { createLog } = require("../models/logsModel");

const requestLogger = async (req, res, next) => {
  try {
    if (req.user) {
      const action = `${req.method} ${req.originalUrl}`;
      const description = `Method: ${req.method}, Path: ${req.originalUrl}`;

      await createLog({
        user_id: req.user.id,
        action,
        description,
      });
    }
  } catch (err) {
    console.error("Log error:", err.message);
  }

  next();
};

module.exports = requestLogger;
