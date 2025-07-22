const {sql} = require('../utils/postgres')

exports.createTour = async (newTour) => {
  const tour = await sql`
      INSERT INTO tours ${sql(
        newTour,
        'title',
        'photo_url',
        'duration',
        'dates',
        'price',
        'category_id'
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