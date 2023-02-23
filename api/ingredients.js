const express = require("express");
const {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
} = require("../db/ingredients");
const router = express.Router();
const { requireUser, requireAdmin } = require("./utils");

router.get("/list", async (req, res, next) => {
  try {
    const qs = req.query.search.toLowerCase();
    const page = req.query.page;
    const limit = page * 12;
    const allIngredients = await getAllIngredients();
    const ingredients = allIngredients
      .filter((ingredient) => ingredient.name.includes(qs.toLowerCase()))
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        return 0;
      });
    res.send(ingredients.splice(limit - 12, limit));
  } catch (error) {
    next(error);
  }
});

router.get("/query", async (req, res, next) => {
  try {
    const qs = req.query.search;
    const allIngredients = await getAllIngredients();
    const ingredients = allIngredients.filter((ingredient) =>
      ingredient.name.includes(qs.toLowerCase())
    );
    res.send(ingredients.slice(0, 8));
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

router.patch(
  "/ingredient/:ingredientId",
  requireAdmin,
  async (req, res, next) => {
    const ingredientId = req.params;
    try {
      const { name, conversion, calories, type, nutrition, creatorId } =
        req.body;
      const updateFields = {
        name,
        conversion,
        calories,
        type,
        nutrition,
        creatorId,
      };
      Object.keys(updateFields).forEach(function (key, idx) {
        if (updateFields[key] === undefined) {
          delete updateFields[key];
        }
      });

      const updated = await updateIngredient({
        id: ingredientId,
        ...updateFields,
      });

      res.send(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", requireUser, async (req, res, next) => {
  const { id: creatorId } = req.user;
  const { name, conversion, calories, type, nutrition } = req.body;
  try {
    const ingredient = await createIngredient({
      name: name.toLowerCase(),
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
