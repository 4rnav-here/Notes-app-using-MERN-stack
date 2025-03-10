const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");

const app = express();
const PORT = process.env.PORT || 5000;
console.log("Connecting to MongoDB...");

mongoose
  .connect(config.connectionString)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.use(cors({ origin: "*" }));
app.use(express.json());

console.log("Loading routes...");
try {
  app.use("/", require("./routers/routes.js"));
  console.log("✅ Routes loaded successfully.");
} catch (error) {
  console.error("❌ Error loading routes:", error);
}

app.get("/", (req, res) => {
  res.json({ data: `Server is running on port ${PORT}` });
});

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));

// Capture unexpected errors
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});
