const { sql } = require("../utils/postgres");

exports.getAllLogs = async () => {
  const logs = await sql`
  SELECT logs.*
    FROM logs
    ORDER BY logs.id ASC;
    `;
  return logs;
};

exports.postLog = async (newLog) => {
  const logs = await sql`
    INSERT INTO logs ${sql(newLog, "user_id", "action", "description")}
       RETURNING *;
    `;
  return logs[0];
};

exports.searchAndFilterLogs = async (params) => {
  const {
    user_id,
    created_at_from,
    created_at_to,
    description,
    sortBy = "created_at",
    order = "desc",
    page = 1,
    limit = 10,
  } = params;

  const offset = (page - 1) * limit;

  const sortColumns = {
    created_at: sql`logs.created_at`,
    user_id: sql`logs.user_id`,
    description: sql`logs.description`,
  };

  const safeSort = sortColumns[sortBy] || sql`logs.created_at`;
  const safeOrder = order.toLowerCase() === "desc" ? sql`DESC` : sql`ASC`;

  const filters = [];
  if (user_id) filters.push(sql`logs.user_id = ${Number(user_id)}`);
  if (created_at_from) filters.push(sql`logs.created_at >= ${created_at_from}`);
  if (created_at_to) filters.push(sql`logs.created_at <= ${created_at_to}`);
  if (description)
    filters.push(sql`logs.description ILIKE ${"%" + description + "%"}`);

  let whereSQL = sql``;
  if (filters.length > 0) {
    let combined = filters[0];
    for (let i = 1; i < filters.length; i++) {
      combined = sql`${combined} AND ${filters[i]}`;
    }
    whereSQL = sql`WHERE ${combined}`;
  }

  const result = await sql`
    SELECT *
    FROM logs
    ${whereSQL}
    ORDER BY ${safeSort} ${safeOrder}
    LIMIT ${limit} OFFSET ${offset}
  `;

  return result || [];
};
