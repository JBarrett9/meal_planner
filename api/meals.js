const express = require("express");
const {
  getMeal,
  createMeal,
  getAccountMeals,
  getUserMeals,
} = require("../db/meals");
const { requireUser } = require("./utils");
const router = express.Router();

router.post("/", requireUser, async (req, res, next) => {
  const { date, time } = req.body;
  try {
    const { id: userId, accountId } = req.user;

    const meal = await createMeal({ accountId, userId, date, time });
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

router.get("/account/:accountId", requireUser, async (req, res, next) => {
  const { accountId } = req.params;
  try {
    if (accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }
    const meals = await getAccountMeals(accountId);
    res.send(meals);
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
