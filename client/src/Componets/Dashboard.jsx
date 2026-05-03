import { useEffect, useState } from "react";
import { getRecipes, addRecipe } from "../api/Recipes";
import "./Dashboard.css"; // Modern styling

function Dashboard() {
  const [recipes, setRecipes] = useState([]);

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  // ✅ FETCH RECIPES
  const loadRecipes = async () => {
    try {
      const response = await getRecipes();
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
      setRecipes([]);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title: form.title,
      ingredients: form.ingredients
        ? form.ingredients.split(",").map((s) => s.trim())
        : [],
      instructions: form.steps,
    };

    try {
      await addRecipe(newRecipe);

      setForm({
        title: "",
        ingredients: "",
        steps: "",
      });

      loadRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header"><span className="emoji-icon">✨</span> My Recipes</h1>

      <div className="dashboard-content">
        {/* ✅ FORM CARD */}
        <div className="recipe-form-card">
          <h2>Create New Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Dish Name</label>
              <input
                className="modern-input"
                name="title"
                placeholder="e.g., Avocado Toast"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Ingredients</label>
              <input
                className="modern-input"
                name="ingredients"
                placeholder="avocado, bread, salt (comma separated)"
                value={form.ingredients}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Instructions</label>
              <textarea
                className="modern-textarea"
                name="steps"
                placeholder="Describe how to make this dish..."
                value={form.steps}
                onChange={handleChange}
                required
              />
            </div>

            <button className="submit-btn" type="submit">
              ✨ Add Recipe
            </button>
          </form>
        </div>

        {/* ✅ RECIPES GRID */}
        <div className="recipes-list">
          {recipes.length > 0 ? (
            recipes.map((r) => (
              <div key={r._id} className="recipe-card">
                <h3 className="recipe-title">{r.title}</h3>

                <div className="recipe-section">
                  <div className="recipe-section-title">Ingredients</div>
                  <div className="ingredients-tags">
                    {Array.isArray(r.ingredients) ? (
                      r.ingredients.map((ing, idx) => (
                        <span key={idx} className="ingredient-tag">
                          {ing}
                        </span>
                      ))
                    ) : (
                      <span className="ingredient-tag">{r.ingredients}</span>
                    )}
                  </div>
                </div>

                <div className="recipe-section" style={{ flexGrow: 1 }}>
                  <div className="recipe-section-title">Instructions</div>
                  <div className="recipe-instructions">{r.instructions}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>🍽️ No recipes found. Add your first recipe!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;