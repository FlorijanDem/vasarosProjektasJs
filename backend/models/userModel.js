const { sql } = require("../utils/postgres");
const db = require("../db");

exports.getAllUsers = async () => {
  const users = await sql`
  SELECT users.*
    FROM users
    ORDER BY users.id ASC;
    `;
  return users;
};

exports.createUser = async (newUser) => {
  const users = await sql`
    INSERT INTO users ${sql(newUser, "email", "password", "role")}
       RETURNING *;
    `;
  return users[0];
};

exports.updateUser = async (id, updatedUser) => {
  const users = await sql`
  UPDATE users SET ${sql(updatedUser, "email", "password", "role")}
  WHERE id = ${id}
  returning *;
`;
  return users[0];
};

exports.deleteUser = async (id) => {
  const users = await sql`
   DELETE FROM users
   WHERE users.id = ${id}
   returning *
    `;
  return users;
};

exports.searchUsers = async ({ email }) => {
  const values = [];
  const whereClauses = [];
  let i = 1;

  if (email) {
    whereClauses.push(`users.email ILIKE $${i++}`);
    values.push(`%${email}%`);
  }

  const whereSQL =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const query = `
    SELECT * FROM users
    ${whereSQL}
  `;
  const result = await db.query(query, values);

  return result;
};

