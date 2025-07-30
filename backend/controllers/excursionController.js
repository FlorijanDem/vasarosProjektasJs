const { getAllExcursionsM } = require("../models/excursionModel.js");

exports.getAllExcursions = async (req, res, next) => {
  try {
    const excursionsList = await getAllExcursionsM();
    res.status(200).json({
      status: "success",
      tours: excursionsList,
    });
  } catch (error) {
    next(error);
  }
};
