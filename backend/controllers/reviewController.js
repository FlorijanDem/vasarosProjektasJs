const {
  getReviewsByIdM,
  getTotalReviewCountM,
} = require("../models/reviewModel");

exports.getReviewsById = async (req, res, next) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const offset = (page - 1) * limit;

  try {
    const reviews = await getReviewsByIdM(id, limit, offset);
    const total = await getTotalReviewCountM(id);

    res.status(200).json({
      status: "success",
      data: {
        reviews,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
