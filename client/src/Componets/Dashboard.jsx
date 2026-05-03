import { useEffect, useState } from "react";
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from "../api/Recipes.js";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Modern styling
import ConfirmModal from "./ConfirmModal";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

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

  // ✅ EDIT
  const handleEdit = (r) => {
    setEditingId(r._id);
    setForm({
      title: r.title,
      ingredients: Array.isArray(r.ingredients) ? r.ingredients.join(", ") : r.ingredients,
      steps: Array.isArray(r.steps) ? r.steps.join("\n") : r.steps,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ DELETE
  const handleDeleteClick = (id) => {
    setRecipeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (recipeToDelete) {
      try {
        await deleteRecipe(recipeToDelete);
        loadRecipes();
        setIsDeleteModalOpen(false);
        setRecipeToDelete(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title: form.title,
      ingredients: form.ingredients
        ? form.ingredients.split(",").map((s) => s.trim())
        : [],
      steps: form.steps ? form.steps.split("\n").filter((s) => s.trim() !== "") : [],
    };

    try {
      if (editingId) {
        await updateRecipe(editingId, recipeData);
        setEditingId(null);
      } else {
        await addRecipe(recipeData);
      }

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
    <>
      <div className="dashboard-container">
        <h1 className="dashboard-header"><span className="emoji-icon"></span> Recipe Generator System</h1>

        <div className="dashboard-content">
          {/*  LEFT PANEL */}
          <div className="dashboard-left-panel">

            {/* ✅ FORM CARD */}
            <div className="recipe-form-card">
              <h2>{editingId ? "Update Recipe" : "Create New Recipe"}</h2>
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
                  {editingId ? "Update Recipe" : "Add Recipe"}
                </button>
                {editingId && (
                  <button
                    className="cancel-btn"
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ title: "", ingredients: "", steps: "" });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* ✅ RECIPES GRID */}
          <div className="recipes-list">
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <div key={r._id} className="recipe-card">
                  <div className="recipe-card-header">
                    <h3 className="recipe-title">{r.title}</h3>
                    <div className="card-actions">
                      <button className="action-btn edit" onClick={() => handleEdit(r)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(r._id)}>Delete</button>
                    </div>
                  </div>

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
                    <div className="recipe-instructions">
                      {Array.isArray(r.steps) && r.steps.length > 0 ? (
                        r.steps.map((step, idx) => (
                          <div key={idx} style={{ marginBottom: '4px' }}>• {step}</div>
                        ))
                      ) : (
                        r.steps || r.instructions || "No instructions provided."
                      )}
                    </div>
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Recipe"
        message="Are you sure you want to permanently delete this recipe? This action cannot be undone."
      />
    </>
  )
}

export default Dashboard;