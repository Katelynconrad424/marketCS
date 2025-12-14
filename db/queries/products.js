import db from "../client.js";

export async function createProduct(title, description, price) {
  const sql = `
    INSERT INTO products (title, description, price)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await db.query(sql, [title, description, price]);

  return result.rows[0];
}

export async function getAllProducts() {
  const sql = `
    SELECT *
    FROM products
  `;

  const result = await db.query(sql);

  return result.rows;
}

export async function getProductById(id) {
  const sql = `
    SELECT *
    FROM products
    WHERE id = $1
  `;

  const result = await db.query(sql, [id]);

  return result.rows[0];
}
