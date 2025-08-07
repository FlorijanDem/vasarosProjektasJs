const { sql } = require("../utils/postgres");

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
    INSERT INTO users ${sql(
      newUser,
      "email",
      "password",
      "role"
    )}
       RETURNING *;
    `;
  return users[0];
};

exports.updateUser = async (id, updatedUser) => {
  const users = await sql`
  update users set ${sql(
    updatedUser,
      "email",
      "password",
      "role"
  )}
  where id = ${id}
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
