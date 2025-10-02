const mongoose = require("mongoose");

const deadSchema = new mongoose.Schema({
  pseudo: { type: String, required: true },
  classe: { type: String, required: true },
  niveau: { type: Number, required: true },
  dateMort: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dead", deadSchema);
