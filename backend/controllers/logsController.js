const {
  getAllLogs,
  postLog,
  searchAndFilterLogs,
} = require("../models/logsModel");
const db = require("../db.js");
const { validationResult } = require("express-validator");

exports.getAllLogs = async (req, res, next) => {
  try {
    const logs = await getAllLogs();

    res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const {
      user_id,
      created_at_from,
      created_at_to,
      description,
      sortBy,
      order,
      page,
      limit,
    } = req.query;

    const logs = await searchAndFilterLogs({
      user_id,
      created_at_from,
      created_at_to,
      description,
      sortBy,
      order,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    });

    res.status(200).json({
      status: "success",
      results: Array.isArray(logs) ? logs.length : 0,
      data: Array.isArray(logs) ? logs : [],
    });
  } catch (error) {
    console.error("Error in getLogs:", error.message);
    next(error);
  }
};

exports.postLog = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newLog = req.body;

    const createdLog = await postLog(newLog);

    res.status(201).json({
      status: "success",
      data: createdLog,
    });
  } catch (error) {
    next(error);
  }
};
