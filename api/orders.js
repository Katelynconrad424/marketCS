import express from "express";
import requireUser from "#middleware/requireUser";
import db from "#db/client";

const router = express.Router();

router.post("/", requireUser, async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: "Date required" });
  }

  const result = await db.query(
    `
    INSERT INTO orders (date, user_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [date, req.user.id]
  );

  res.status(201).json(result.rows[0]);
});

router.get("/", requireUser, async (req, res) => {
  const result = await db.query("SELECT * FROM orders WHERE user_id = $1", [
    req.user.id,
  ]);

  res.json(result.rows);
});

router.get("/:id", requireUser, async (req, res) => {
  const result = await db.query("SELECT * FROM orders WHERE id = $1", [
    req.params.id,
  ]);

  const order = result.rows[0];

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (order.user_id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  res.json(order);
});

router.post("/:id/products", requireUser, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const orderResult = await db.query("SELECT * FROM orders WHERE id = $1", [
    req.params.id,
  ]);

  const order = orderResult.rows[0];

  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.user_id !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  const productCheck = await db.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  if (!productCheck.rows[0]) {
    return res.status(400).json({ error: "Invalid productId" });
  }

  const result = await db.query(
    `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [req.params.id, productId, quantity]
  );

  res.status(201).json(result.rows[0]);
});

router.get("/:id/products", requireUser, async (req, res) => {
  const orderResult = await db.query("SELECT * FROM orders WHERE id = $1", [
    req.params.id,
  ])
); 


export default router;
