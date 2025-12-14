import express from "express";
import apiRouter from "./api/index.js";

const app = express();

// middleware that lets us read JSON from requests
app.use(express.json());

// all API routes start with /api
app.use("/api", apiRouter);

// simple test route (optional but helpful)
app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;
