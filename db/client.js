import pg from "pg";
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/marketcs"
);
export default db;

module.exports = client;
