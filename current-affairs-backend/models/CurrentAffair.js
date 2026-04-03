const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  explanation: String,
  category: {
    type: String,
    enum: [
      "APPOINTMENTS",
      "AWARDS",
      "SPORTS",
      "ECONOMY",
      "SCIENCE",
      "NATIONAL & INTERNATIONAL"
    ]
  }
});

const currentAffairSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: String,
  content: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model("CurrentAffair", currentAffairSchema);