const client = require("./client");

/**
 * Adds a new meal to the database and returns a meal object
 *
 * @param {{accountId: number, userId: number, date: date, time: number}} param0
 * @returns {meal}
 */
const createMeal = async ({ accountId, userId, date, time }) => {
  try {
    const {
      rows: [meal],
    } = await client.query(
      `INSERT INTO meals("accountId", "creatorId", date, time) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [accountId, userId, date, time]
    );

    return meal;
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {number} id
 */
const deleteMeal = async (id) => {
  try {
    const meal = getMeal(id);

    for (let mealRecipe of meal.recipes) {
      removeRecipeFromMeal(mealRecipe.id);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns the meals for given account
 *
 * @param {number} accountId
 * @returns {[meal]}
 */
const getAccountMeals = async (accountId) => {
  try {
    const { rows: meals } = await client.query(
      `SELECT * FROM meals WHERE "accountId"=$1;`,
      [accountId]
    );

    for (let meal of meals) {
      let { rows: recipes } = await client.query(
        `SELECT * FROM recipes 
        JOIN meal_recipes ON meal_recipes."recipeId"=recipes.id 
        WHERE meal_recipes."mealId"=${meal.id};`
      );

      meal.recipes = recipes;
    }

    return meals;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns meal for given id
 *
 * @param {number} id
 * @returns {meal}
 */
const getMeal = async (id) => {
  try {
    const {
      rows: [meal],
    } = await client.query(`SELECT * FROM meals WHERE id=($1)`, [id]);

    const { rows: recipes } = await client.query(
      `SELECT * FROM recipes 
            JOIN meal_recipes ON meal_recipes."recipeId"=recipes.id 
            WHERE meal_recipes."mealId"=${meal.id};`
    );

    meal.recipes = recipes;

    return meal;
  } catch (error) {
    console.error(error);
  }
};

const getMealByDate = async ({ date, accountId }) => {
  try {
    const {
      rows: [meal],
    } = await client.query(
      `SELECT * FROM meals WHERE "date"=$1 AND "accountId"=$2;`,
      [date, accountId]
    );

    return meal;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns an array of meal objects associated with the given user
 *
 * @param {number} userId
 * @returns {[meal]}
 */
const getUserMeals = async (userId) => {
  try {
    const { rows: meals } = await client.query(
      `SELECT * FROM meals WHERE "creatorId"=$1;`,
      [userId]
    );

    for (let meal of meals) {
      let { rows: recipes } = await client.query(
        `SELECT * FROM recipes 
        JOIN meal_recipes ON meal_recipes."recipeId"=recipes.id 
        WHERE meal_recipes."mealId"=${meal.id};`
      );

      meal.recipes = recipes;
    }

    return meals;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createMeal,
  getAccountMeals,
  getMeal,
  getMealByDate,
  getUserMeals,
};
