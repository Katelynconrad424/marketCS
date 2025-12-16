import express from "express";
import requireUser from "#middleware/requireUser";
import { getAllProducts, getProductById } from "#db/queries/products";
import db from "#db/client";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

router.get("/:id/orders", requireUser, async (req, res) => {
  const product = await getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const result = await db.query(sql, [req.params.id, req.user.id]);
  res.json(result.rows);
});

export default router;
