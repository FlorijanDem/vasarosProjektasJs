const { sql } = require("../utils/postgres");
const db = require("../db");

exports.getAllReservations = async () => {
  const reservations = await sql`
  SELECT *
    FROM registrations
    ORDER BY created_at ASC;
    `;
  return reservations;
};

exports.createReservation = async (newReservation) => {
  const reservation = await sql`
    INSERT INTO registrations ${sql(
      newReservation,
      "user_id",
      "tour_id",
      "selected_date",
      "status"
    )}
       RETURNING *;
    `;
  return reservation[0];
};

exports.updateReservation = async (id, updatedReservation) => {
  const reservations = await sql`
  update registrations set ${sql(
    updatedReservation,
    "user_id",
    "tour_id",
    "selected_date",
    "status"
  )}
  where id = ${id}
  returning *;
`;
  return reservations[0];
};

exports.deleteReservation = async (id) => {
  const reservations = await sql`
   DELETE FROM registrations
   WHERE registrations.id = ${id}
   returning *
    `;
  return reservations;
};