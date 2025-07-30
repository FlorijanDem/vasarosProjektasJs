const { getAllToursM } = require("../models/tourModel.js");

// Get all tours
exports.getAllTours = async (res, next) => {
  try {
    const toursList = await getAllToursM();
    res.status(200).json({
      status: "success",
      tours: toursList,
    });
  } catch (error) {
    next(error);
  }
};
