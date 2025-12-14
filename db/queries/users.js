import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;

  const result = await db.query(sql, [username, hashedPassword]);
  return result.rows[0];
}

export async function getUserByUsername(username) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1
  `;

  const result = await db.query(sql, [username]);

  return result.rows[0];
}
