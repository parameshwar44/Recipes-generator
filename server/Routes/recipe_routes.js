const express = require("express");
const router = express.Router();

const recipeController = require("../Controllers/recipeController");

// ✅ ADD
router.post("/add", recipeController.addRecipe);

// ✅ GET ALL
router.get("/getrecipes", recipeController.getRecipes);

// ✅ GENERATE
router.post("/generate", recipeController.generateRecipe);




module.exports = router;