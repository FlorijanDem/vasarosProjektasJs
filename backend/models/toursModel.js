const { sql } = require("../utils/postgres");
const db = require("../db");

exports.getAllToursM = async () => {
  const toursList = await sql`
    SELECT 
      tours.*, 
      categories.name AS category_name,
      ARRAY_AGG(DISTINCT tours_dates.date ORDER BY tours_dates.date) AS tour_dates,
      ROUND(AVG(reviews.rating), 1) AS average_rating
    FROM tours
    JOIN categories 
      ON tours.category_id = categories.id
    LEFT JOIN tours_dates 
      ON tours.id = tours_dates.tour_id
    LEFT JOIN reviews
      ON tours.id = reviews.tour_id
    GROUP BY tours.id, categories.name;
    `;
  return toursList;
};

exports.createTour = async (newTour) => {
  const tour = await sql`
      INSERT INTO tours ${sql(
        newTour,
        "title",
        "photo_url",
        "duration",
        "dates",
        "price",
        "category_id",
        "description",
        "location"
      )}
         RETURNING *;
      `;
  return tour[0];
};

exports.deleteTour = async (id) => {
  const tour = await sql`
   DELETE FROM tours
   WHERE tours.id = ${id}
   returning *
    `;
  return tour;
};

exports.updateTour = async (id, updatedTour) => {
  const tour = await sql`
    update tours set ${sql(
      updatedTour,
      "title",
      "photo_url",
      "duration",
      "dates",
      "price",
      "category_id"
    )}
    where id = ${id}
    returning *;
  `;
  return tour[0];
};

exports.searchAndFilterTours = async (params) => {
  const {
    title,
    category_id,
    sortBy = "title",
    order = "asc",
    page = 1,
    limit = 10,
  } = params;

  const offset = (page - 1) * limit;
  const values = [];
  let whereClauses = [];
  let i = 1;

  if (title) {
    whereClauses.push(`tours.title ILIKE $${i++}`);
    values.push(`%${title}%`);
  }

  if (category_id) {
    whereClauses.push(`tours.category_id = $${i++}`);
    values.push(category_id);
  }

  const whereSQL =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const sortColumns = {
    title: "tours.title",
    price: "tours.price::numeric",
  };

  const safeSort = sortColumns[sortBy] || "tours.title";
  const safeOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  const query = `
    SELECT 
      tours.*, 
      categories.name AS category_name,
      ARRAY_AGG(DISTINCT tours_dates.date ORDER BY tours_dates.date) AS tour_dates,
      ROUND(AVG(reviews.rating), 1) AS average_rating
    FROM tours
    JOIN categories ON tours.category_id = categories.id
    LEFT JOIN tours_dates ON tours.id = tours_dates.tour_id
    LEFT JOIN reviews ON tours.id = reviews.tour_id
    ${whereSQL}
    GROUP BY tours.id, categories.name
    ORDER BY ${safeSort} ${safeOrder}
    LIMIT $${i++} OFFSET $${i}
  `;

  values.push(limit, offset);

  const result = await db.query(query, values);
  return result.rows;
};
