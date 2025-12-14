import express from "express";
import {
  createOrder,
  addProductToOrder,
  getOrdersByUserId,
  getProductsByOrderId,
} from "#db/queries/orders";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, note } = req.body;

  const order = await createOrder(userId, note);
  res.json(order);
});

router.post("/:id/products", async (req, res) => {
  const { productId, quantity } = req.body;

  const item = await addProductToOrder(req.params.id, productId, quantity);

  res.json(item);
});

router.get("/user/:userId", async (req, res) => {
  const orders = await getOrdersByUserId(req.params.userId);
  res.json(orders);
});

router.get("/:id/products", async (req, res) => {
  const products = await getProductsByOrderId(req.params.id);
  res.json(products);
});

export default router;
