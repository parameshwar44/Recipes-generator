const express = require("express");
const router = express.Router();

const recipeController = require("../Controllers/recipeController");

// ✅ ADD
router.post("/add", recipeController.addRecipe);

// ✅ GET ALL
router.get("/getrecipes", recipeController.getRecipes);

// ✅ GENERATE
router.post("/generate", recipeController.generateRecipe);

// ✅ UPDATE
router.put("/update/:id", recipeController.updateRecipe);

// ✅ DELETE
router.delete("/delete/:id", recipeController.deleteRecipe);

module.exports = router;