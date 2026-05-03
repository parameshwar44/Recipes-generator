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

    // AI generation is currently commented out, returning 501 for now.
    return res.status(501).json({ error: "AI generation is currently disabled." });

    // const prompt = `
    // You are a professional chef.
    // 
    // Generate a recipe.
    // 
    // Dish: ${title}
    // Category: ${category}
    // 
    // Return ONLY valid JSON:
    // {
    //   "ingredients": ["ingredient1", "ingredient2"],
    //   "steps": ["step1", "step2"]
    // }
    // `;

    // if (!openai) {
    //   return res.status(501).json({ error: "OpenAI API key not configured on server" });
    // }

    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [{ role: "user", content: prompt }],
    // });

    // let text = response.choices[0].message.content;

    // 🔥 Clean response (important)
    // text = text.replace(/```json|```/g, "").trim();

    // let data;
    // try {
    //   data = JSON.parse(text);
    // } catch (err) {
    //   return res.status(500).json({
    //     error: "Invalid JSON from AI",
    //     raw: text,
    //   });
    // }

    // ✅ Save generated recipe to DB
    // const newRecipe = new Recipe({
    //   title,
    //   category,
    //   ingredients: data.ingredients,
    //   steps: data.steps,
    // });

    // const savedRecipe = await newRecipe.save();

    // res.json({
    //   message: "Recipe generated successfully",
    //   recipe: savedRecipe,
    // });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};