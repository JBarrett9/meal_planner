const express = require("express");
const {
  getAllIngredients,
  getIngredientById,
  createIngredient,
} = require("../db/ingredients");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/query", async (req, res, next) => {
  try {
    const qs = req.query.search;
    const allIngredients = await getAllIngredients();
    const ingredients = allIngredients.filter((ingredient) =>
      ingredient.name.includes(qs.toLowerCase())
    );
    res.send(ingredients);
  } catch (error) {
    next(error);
  }
});

router.get("/ingredient/:ingredientId", async (req, res, next) => {
  const { ingredientId } = req.params;
  try {
    const ingredient = await getIngredientById(ingredientId);
    res.send(ingredient);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireUser, async (req, res, next) => {
  const { id: creatorId } = req.user;
  const { name, conversion, calories, type, nutrition } = req.body;
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
