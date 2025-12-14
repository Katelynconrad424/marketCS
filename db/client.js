import pg from "pg";
const { Client } = pg;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default db;
