const { getAllReviewsM } = require("../models/reviewModel");

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviewsList = await getAllReviewsM();
    res.status(200).json({
      status: "success",
      reviews: reviewsList,
    });
  } catch (error) {
    next(error);
  }
};
