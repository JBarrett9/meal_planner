const express = require("express");
const { addIngredientToRecipe } = require("../db/ingredients");
const {
  createRecipe,
  getRecipe,
  getAccountRecipes,
  getRecipesByCategory,
} = require("../db/recipes");
const { requireUser } = require("./utils");
const router = express.Router();

router.post("/", requireUser, async (req, res, next) => {
  try {
    const { name, steps, description, source, pub } = req.body;
    const { id: userId, accountId } = req.user;

    const recipe = await createRecipe({
      name,
      steps,
      description,
      accountId,
      userId,
      source,
      pub,
    });
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/recipe/:recipeId", requireUser, async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await getRecipe(recipeId);
    if (recipe.accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }

    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/account", requireUser, async (req, res, next) => {
  try {
    const recipes = await getAccountRecipes(req.user.accountId);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

router.get("/category/:categoryId", requireUser, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const recipes = await getRecipesByCategory(categoryId, req.user.accountId);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/recipe/:recipeId/ingredients",
  requireUser,
  async (req, res, next) => {
    try {
      const { recipeId } = req.params;
      const recipe = await getRecipe(recipeId);
      if (recipe.accountId !== req.user.accountId) {
        res.status(403).send({
          error: `User is not authorized to access this account`,
          message: `User is not authorized to access this account`,
          name: `UserAccountMismatchError`,
        });
      }
      const { ingredientId, qty, unit, order } = req.body;
      const recipeIngredient = await addIngredientToRecipe({
        recipeId,
        ingredientId,
        qty,
        unit,
        order,
      });
      res.send(recipeIngredient);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
