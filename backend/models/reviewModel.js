const { sql } = require("../utils/postgres");

exports.getReviewsByIdM = async (id, limit, offset) => {
  const reviewsList = await sql`
    SELECT reviews.*, users.email
    FROM reviews
    JOIN users ON users.id = reviews.user_id
    WHERE reviews.tour_id = ${id}
    ORDER BY reviews.created_at DESC
    LIMIT ${limit} OFFSET ${offset};
    `;
  return reviewsList;
};

exports.getTotalReviewCountM = async (id) => {
  const result = await sql`
    SELECT COUNT(*)::int AS count
    FROM reviews
    WHERE tour_id = ${id};
  `;
  return result[0].count;
};
