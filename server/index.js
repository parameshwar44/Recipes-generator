require('dotenv').config();
const express = require("express");
const dbconnection = require("./db");
const cors = require("cors");
const { default: axios } = require('axios');

const app = express();
const PORTNUMBER = 7000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
dbconnection();

// Routes
app.use('/user', require("./Routes/user_routes"));
app.use("/recipes", require("./Routes/recipe_routes"));
app.use("/category", require("./Routes/category_routes"));
// Test API
axios.post('http://localhost:7000/recipes/add')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  axios.get('http://localhost:7000/recipes/getrecipes')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// Start server
app.listen(PORTNUMBER, () => {
  console.log(`Crazy bro your Server is running on portnumber : ${PORTNUMBER}`);
});