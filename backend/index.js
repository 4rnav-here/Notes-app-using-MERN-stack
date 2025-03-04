const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();

mongoose.connect(config.connectionString);
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Server is running on port 5000" });
});

app.use("/", require("./routers/routes.js"));

  

app.listen(5000);

module.exports = app;
