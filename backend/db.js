require("dotenv").config();
const postgres = require("postgres");

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = {
  query: (text, params) => sql.unsafe(text, params),
  sql,
};
