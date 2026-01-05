const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  organizerName: { type: String, required: true },
  participants: [
    {
      pseudo: String,
      classe: String,
      niveau: Number,
    },
  ],
  loot: [String],
});

module.exports = mongoose.model("Event", eventSchema);
