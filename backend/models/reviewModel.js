const { sql } = require("../utils/postgres");

exports.getAllReviewsM = async () => {
  const reviewsList = await sql`
    SELECT reviews.*, email FROM reviews
    JOIN users
    ON users.id = reviews.user_id
    ORDER BY reviews.created_at DESC;
    `;
  return reviewsList;
};
