const sql = require('../utils/postgres');

// Example function to create an example (row)
async function createExample(name, recipe) {
  return await sql`
    INSERT INTO cakes (name, recipe)
    VALUES (${name}, ${recipe})
    RETURNING *
  `;
}

// Example function to get examples by name
async function getExampleByName(name) {
  return await sql`
    SELECT * 
    FROM cakes 
    WHERE name = ${name}
  `;
}

module.exports = {
  createExample,
  getExampleByName
};
