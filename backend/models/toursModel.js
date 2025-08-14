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

  const sortColumns = {
    title: sql`tours.title`,
    price: sql`tours.price::numeric`,
  };

  const safeSort = sortColumns[sortBy] || sql`tours.title`;
  const safeOrder = order.toLowerCase() === "desc" ? sql`DESC` : sql`ASC`;
  const filters = [];
  if (title) {
    filters.push(sql`tours.title ILIKE ${'%' + title + '%'}`);
  }
  if (category_id) {
    filters.push(sql`tours.category_id = ${category_id}`);
  }

  let whereSQL = sql``;
  if (filters.length > 0) {
    let combined = filters[0];
    for (let i = 1; i < filters.length; i++) {
      combined = sql`${combined} AND ${filters[i]}`;
    }
    whereSQL = sql`WHERE ${combined}`;
  }

  const result = await sql`
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
    LIMIT ${limit} OFFSET ${offset}
  `;

  return result || [];
};
