const postgres = require('postgres');
require('dotenv').config()

const sql = postgres({
  host: process.env.DB_HOST || 'localhost', // change as needed
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'your_database',
  username: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
});

module.exports = sql;
