const Recipe = require("../Models/Recipe");

// OpenAI is optional — instantiate only when API key present
// let openai = null;
// try {
//   if (process.env.OPENAI_API_KEY) {
//     const OpenAI = require("openai");
//     openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//   } else {
//     console.warn("OPENAI_API_KEY not set — AI generate endpoint disabled");
//   }
// } catch (err) {
//   console.warn("Failed to initialize OpenAI client:", err.message);
//   openai = null;
// }

// ✅ ADD RECIPE
exports.addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();

    res.json({
      message: "Recipe saved to DB",
      recipe,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL RECIPES
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🤖 GENERATE RECIPE USING AI
exports.generateRecipe = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        error: "Title and category are required",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE RECIPE
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE RECIPE
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};