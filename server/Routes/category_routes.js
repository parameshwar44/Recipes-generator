const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");

router.get("/getAll", categoryController.getAllCategories);
router.post("/add", categoryController.addCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
