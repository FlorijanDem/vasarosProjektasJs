const {sql} = require('../utils/postgres')

exports.createUser = async (newUser) => {
    const { email, password } = newUser;

    const user = await sql`
    INSERT INTO users ${sql(
        { email, password },
        'email',
        'password'
    )}
    RETURNING *
    `;
    return user;
};

exports.getUserByEmail = async (email) => {
  const users = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return users[0];
};

exports.checkUser = async (email) => {
  const users = await sql`
  SELECT *
  FROM users
  WHERE email = ${email}
  `;
  
  return users [0];
}