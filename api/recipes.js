const express = require("express");
const {
  addCategoryToRecipe,
  removeCategoryFromRecipe,
} = require("../db/categories");
const {
  addIngredientToRecipe,
  removeIngredientFromRecipe,
} = require("../db/ingredients");
const {
  createRecipe,
  getRecipe,
  getAccountRecipes,
  getRecipesByCategory,
  deleteRecipe,
} = require("../db/recipes");
const { requireUser } = require("./utils");
const router = express.Router();

router.post("/", requireUser, async (req, res, next) => {
  try {
    const { name, steps, description, source, pub } = req.body;
    const { id: userId, accountId } = req.user;

    const recipe = await createRecipe({
      name: name,
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

router.delete("/recipe/:recipeId", requireUser, async (req, res, next) => {
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

    const removed = await deleteRecipe(recipeId);

    return removed;
  } catch (error) {
    next(error);
  }
});

router.patch("/recipe/:recipeId", requireUser, async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { name, steps, description, source, pub } = req.body;
    const { id: userId, accountId } = req.user;

    const recipe = await getRecipe(recipeId);
    if (recipe.accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/account", requireUser, async (req, res, next) => {
  try {
    let qs = req.query.search.toLowerCase();
    const page = req.query.page;
    const limit = page * 12;
    const accountRecipes = await getAccountRecipes(req.user.accountId);
    const recipes = accountRecipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(qs) ||
        recipe.description.toLowerCase().includes(qs) ||
        recipe.ingredients.filter((ingredient) => ingredient.name.includes(qs))
          .length > 0 ||
        recipe.categories.filter((category) => category.name.includes(qs))
          .length > 0
    );
    res.send(recipes.splice(limit - 12, limit));
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

router.post(
  "/recipe/:recipeId/categories",
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
      const { categoryId } = req.body;
      const recipeCategory = await addCategoryToRecipe({
        recipeId,
        categoryId,
      });
      res.send(recipeCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/recipe/:recipeId/step_view",
  requireUser,
  async (req, res, next) => {
    try {
      const { recipeId } = req.params;
      const step = Number(req.query.step);

      const recipe = await getRecipe(recipeId);
      if (recipe.accountId !== req.user.accountId) {
        res.status(403).send({
          error: `User is not authorized to access this account`,
          message: `User is not authorized to access this account`,
          name: `UserAccountMismatchError`,
        });
      }

      let data = { ingredients: recipe.ingredients };
      const steps = recipe.steps.split("\n");
      data.limit = steps.length;

      if (step === 0) {
        res.send(data);
      }

      const current = steps[step - 1];
      data.current = current;

      let second = current.match(/\d+ second/i);
      let minute = current.match(/\d+ minute/i);
      let hour = current.match(/\d+ hour/i);

      data.seconds = "00";
      data.minutes = "00";
      data.hours = "00";

      if (second) {
        data.seconds = second[0].match(/\d+/)[0];
      }
      if (minute) {
        data.minutes = minute[0].match(/\d+/)[0];
      }
      if (hour) {
        data.hours = hour[0].match(/\d+/)[0];
      }

      res.send(data);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/recipe_category/:recipeCategoryId",
  requireUser,
  async (req, res, next) => {
    try {
      const { recipeCategoryId } = req.params;
      const { recipeCategory } = await removeCategoryFromRecipe(
        recipeCategoryId
      );

      return recipeCategory;
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
