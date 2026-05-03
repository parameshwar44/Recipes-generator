import axios from 'axios';

const API_URL = 'http://localhost:7000/recipes';

export const getRecipes = async () => {
  return await axios.get(`${API_URL}/getrecipes`);
};

export const addRecipe = async (recipeData) => {
  return await axios.post(`${API_URL}/add`, recipeData);
};

export const updateRecipe = async (id, recipeData) => {
  return await axios.put(`${API_URL}/update/${id}`, recipeData);
};

export const deleteRecipe = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`);
};
