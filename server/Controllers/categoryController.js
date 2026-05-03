const Category = require("../Models/Category");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name, description });
    await category.save();

    return res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
