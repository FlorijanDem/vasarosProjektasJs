const { sql } = require("../utils/postgres");

exports.addToBlacklistedTokens = async (data) => {
    const { token, expires_at } = data;
    await sql`
    INSERT INTO blacklisted_tokens ${sql(
        { token, expires_at },
        "token", "expires_at"
    )

        }
    `
    return 0;
}