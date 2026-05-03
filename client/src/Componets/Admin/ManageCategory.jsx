import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, TextField, Button, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(15px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  height: '100%',
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(170, 59, 255, 0.15)',
  }
}));

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #aa3bff, #ff3b8f)',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '12px',
  padding: '12px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, #9a2bee, #ef2b7f)',
  }
});

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7000/category/getAll");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/category/add", { name, description });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/category/delete/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pt: 10, px: 5 }}>
      <Typography variant="h3" sx={{ 
        fontWeight: 800, 
        mb: 4,
        background: 'linear-gradient(45deg, #aa3bff, #ff3b8f)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Manage Categories
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <GlassPaper>
            <Typography variant="h5" fontWeight={600} mb={3} color="#aa3bff">Add New Category</Typography>
            <form onSubmit={handleAdd}>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }}
                required
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }}
              />
              <GradientButton type="submit" fullWidth>
                Add Category
              </GradientButton>
            </form>
          </GlassPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {categories.map((cat) => (
              <Grid item xs={12} sm={6} key={cat._id}>
                <CategoryCard>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6" fontWeight={700} color="#333">
                      {cat.name}
                    </Typography>
                    <IconButton onClick={() => handleDelete(cat._id)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {cat.description || "No description provided."}
                  </Typography>
                </CategoryCard>
              </Grid>
            ))}
            {categories.length === 0 && (
              <Grid item xs={12}>
                <GlassPaper sx={{ textAlign: 'center', color: '#888' }}>
                  No categories found. Add your first one!
                </GlassPaper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManageCategory;
