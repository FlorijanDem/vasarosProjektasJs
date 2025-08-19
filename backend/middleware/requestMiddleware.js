const { createLog } = require("../models/logsModel");

const requestLogger = async (req, res, next) => {
  try {
    const action = `${req.method} ${req.originalUrl}`;
    const description = `Method: ${req.method}, Path: ${req.originalUrl}`;

    await createLog({
      user_id: req.user ? req.user.id : null,
      action,
      description,
    });
  } catch (err) {
    console.error("Log error:", err.message);
  }

  next();
};

module.exports = requestLogger;
