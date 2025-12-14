const express = require("express");
const app = express.Router();

app.get("/", async (req, res, next) => {
  res.send("inside of GET /api/users route!");
});

module.exports = app;
