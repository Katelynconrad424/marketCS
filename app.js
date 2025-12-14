import express from "express";
import apiRouter from "./api/index.js";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
