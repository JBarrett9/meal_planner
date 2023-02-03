const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
} = require("../db/categories");
const { requireUser } = require("./utils");
const router = express.Router();

router.get("/query", async (req, res, next) => {
  try {
    const qs = req.query.search;
    const allCategories = await getAllCategories();
    const categories = allCategories.filter((category) =>
      category.name.includes(qs.toLowerCase())
    );
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/category/:categoryId", async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const category = await getCategoryById(categoryId);
    res.send(category);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireUser, async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await createCategory(name.toLowerCase());

    res.send(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
