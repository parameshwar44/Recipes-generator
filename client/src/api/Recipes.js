import axios from 'axios';

const API_URL = 'http://localhost:7000/recipes';

export const getRecipes = async () => {
  return await axios.get(`${API_URL}/getrecipes`);
};

export const addRecipe = async (recipeData) => {
  return await axios.post(`${API_URL}/add`, recipeData);
};
