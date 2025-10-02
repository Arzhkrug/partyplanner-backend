require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const eventRoutes = require("./routes/eventRoutes");
const deadRoutes = require("./routes/deadRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/dead", deadRoutes);
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.post("/debug", (req, res) => {
  console.log("DEBUG route OK", req.body);
  res.send("ça passe depuis server.js");
});
// Connexion Mongo + lancement serveur
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error ❌", err));
