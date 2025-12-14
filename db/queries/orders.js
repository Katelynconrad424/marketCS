import db from "../client.js";

export async function createOrder(userId, note) {
  const sql = `
    INSERT INTO orders (date, note, user_id)
    VALUES (CURRENT_DATE, $1, $2)
    RETURNING *
  `;

  const result = await db.query(sql, [note, userId]);

  return result.rows[0];
}

export async function addProductToOrder(orderId, productId, quantity) {
  const sql = `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await db.query(sql, [orderId, productId, quantity]);

  return result.rows[0];
}

export async function getOrdersByUserId(userId) {
  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = $1
  `;

  const result = await db.query(sql, [userId]);

  return result.rows;
}

export async function getProductsByOrderId(orderId) {
  const sql = `
    SELECT
      products.id,
      products.title,
      products.price,
      orders_products.quantity
    FROM orders_products
    JOIN products
      ON products.id = orders_products.product_id
    WHERE orders_products.order_id = $1
  `;

  const result = await db.query(sql, [orderId]);

  return result.rows;
}
