const express = require("express");
const {
  getMeal,
  createMeal,
  getAccountMeals,
  getUserMeals,
  getMealByDate,
} = require("../db/meals");
const { addRecipeToMeal } = require("../db/recipes");
const { requireUser } = require("./utils");
const router = express.Router();

router.post("/", requireUser, async (req, res, next) => {
  const { date, time } = req.body;
  try {
    const { id: userId, accountId } = req.user;
    let meal = await getMealByDate({ date, accountId });
    if (!meal?.id) {
      meal = await createMeal({ accountId, userId, date, time });
    }

    res.send(meal);
  } catch (error) {
    next(error);
  }
});

router.post("/meal/:mealId/recipes", requireUser, async (req, res, next) => {
  const { mealId } = req.params;
  const { recipeId } = req.body;
  try {
    const meal = await getMeal(mealId);
    if (meal.accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }

    await addRecipeToMeal({ mealId, recipeId });

    res.send(meal);
  } catch (error) {
    next(error);
  }
});

router.get("/date/:date", requireUser, async (req, res, next) => {
  const { date } = req.params;
  try {
    const meal = await getMealByDate({ date, accountId: req.user.accountId });

    res.send(meal);
  } catch (error) {
    next(error);
  }
});

router.get("/meal/:mealId", requireUser, async (req, res, next) => {
  const { mealId } = req.params;
  try {
    const meal = await getMeal(mealId);
    if (meal.accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }

    res.send(meal);
  } catch (error) {
    next(error);
  }
});

router.get("/account", requireUser, async (req, res, next) => {
  try {
    const meals = await getAccountMeals(req.user.accountId);
    let data = {};
    for (let meal of meals) {
      data[meal.date.toDateString()] = meal.recipes;
    }
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (userId !== req.user.id) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }

    const meals = await getUserMeals(userId);
    res.send(meals);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
