const { sql } = require("../utils/postgres");

exports.addToBlacklistedTokens = async (data) => {
    const { token, expiresAt } = data;
    await sql`
    INSERT INTO blacklisted_tokens ${sql(
        { token, expiresAt },
        "token", "expiresAt"
    )

        }
    `
    return 0;
}