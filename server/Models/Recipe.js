const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  steps: {
    type: [String],
    required: true
  },
  category: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);