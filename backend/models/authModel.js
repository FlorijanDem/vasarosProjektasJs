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

