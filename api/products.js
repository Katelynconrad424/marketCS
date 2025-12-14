import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "#db/queries/products";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await getProductById(req.params.id);
  res.json(product);
});

router.post("/", async (req, res) => {
  const { title, description, price } = req.body;

  const product = await createProduct(title, description, price);
  res.json(product);
});

export default router;
