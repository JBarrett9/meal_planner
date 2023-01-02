require("dotenv").config();
const express = require("express");
const {
  getAllIngredients,
  getIngredientById,
  createIngredient,
} = require("../db/ingredients");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/", async (req, res, next) => {
  try {
    const ingredients = await getAllIngredients();
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
});

router.get("/:ingredientId", async (req, res, next) => {
  const { ingredientId } = req.params;
  try {
    const ingredient = await getIngredientById(ingredientId);
    res.send(ingredient);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireUser, async (req, res, next) => {
  const { name, conversion, calories, type, nutrition, creatorId } = req.body;
  try {
    const ingredient = await createIngredient({
      name,
      conversion,
      calories,
      type,
      nutrition,
      creatorId,
    });
    res.send(ingredient);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
