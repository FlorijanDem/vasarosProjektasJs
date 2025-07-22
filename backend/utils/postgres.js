require('dotenv').config();

const postgres = require('postgres');

const sql = postgres({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || 'your_database',
  username: process.env.DB_USER || 'your_username',  
  password: process.env.DB_PASSWORD || 'your_password',
});

const testConnection = async () => {
  try {
    await sql`SELECT 1`;
    console.log('DB connection successful');
  } catch (error) {
    console.error('DB connection failed:', error);
  }
};

module.exports = {
  sql,
  testConnection,
};
