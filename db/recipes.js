const { removeCategoryFromRecipe } = require("./categories");
const client = require("./client");
const { removeIngredientFromRecipe } = require("./ingredients");

const createRecipe = async ({
  name,
  steps,
  description,
  accountId,
  userId,
  source,
  pub,
}) => {
  try {
    const {
      rows: [recipe],
    } = await client.query(
      `INSERT INTO recipes(name, steps, description, "accountId", "creatorId", source, public) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;`,
      [name, steps, description, accountId, userId, source, pub]
    );

    return recipe;
  } catch (error) {
    console.error(error);
  }
};

const deleteRecipe = async (id) => {
  try {
    const recipe = await getRecipe(id);

    for (let ingredient of recipe.ingredients) {
      await removeIngredientFromRecipe(ingredient.id);
    }

    for (let category of recipe.categories) {
      await removeCategoryFromRecipe(category.id);
    }

    const {
      rows: [deleted],
    } = await client.query(`DELETE FROM recipes WHERE id=$1 RETURNING *;`, [
      id,
    ]);

    return deleted;
  } catch (error) {
    console.error(error);
  }
};

const getAccountRecipes = async (accountId) => {
  try {
    const { rows: recipes } = await client.query(
      `SELECT * FROM recipes WHERE "accountId"=$1;`,
      [accountId]
    );

    for (let recipe of recipes) {
      let { rows: ingredients } = await client.query(
        `SELECT * FROM ingredients 
        JOIN recipe_ingredients ON recipe_ingredients."ingredientId"=ingredients.id 
        WHERE recipe_ingredients."recipeId"=${recipe.id};`
      );

      let { rows: categories } = await client.query(
        `SELECT * FROM categories 
        JOIN recipe_categories ON recipe_categories."categoryId"=categories.id 
        WHERE recipe_categories."recipeId"=${recipe.id};`
      );

      recipe.ingredients = ingredients;
      recipe.categories = categories;
    }

    return recipes;
  } catch (error) {
    console.error(error);
  }
};

const getRecipe = async (id) => {
  try {
    const {
      rows: [recipe],
    } = await client.query(`SELECT * FROM recipes WHERE id=$1;`, [id]);

    let { rows: ingredients } = await client.query(
      `SELECT * FROM ingredients 
        JOIN recipe_ingredients ON recipe_ingredients."ingredientId"=ingredients.id 
        WHERE recipe_ingredients."recipeId"=${recipe.id};`
    );

    let { rows: categories } = await client.query(
      `SELECT * FROM categories 
        JOIN recipe_categories ON recipe_categories."categoryId"=categories.id 
        WHERE recipe_categories."recipeId"=${recipe.id};`
    );

    recipe.ingredients = ingredients;
    recipe.categories = categories;

    return recipe;
  } catch (error) {
    console.error(error);
  }
};

const getRecipesByCategory = async (categoryId, accountId) => {
  try {
    const { rows: recipes } = await client.query(
      `SELECT * FROM recipes JOIN recipe_categories ON recipe_categories."recipeId"=recipes.id 
          WHERE recipe_categories."categoryId"=$1;`,
      [categoryId]
    );

    for (let recipe of recipes) {
      const { rows: ingredients } = await client.query(
        `SELECT * FROM ingredients 
        JOIN recipe_ingredients ON recipe_ingredients."ingredientId"=ingredients.id 
        WHERE recipe_ingredients."recipeId"=${recipe.id};`
      );

      let { rows: categories } = await client.query(
        `SELECT * FROM categories 
        JOIN recipe_categories ON recipe_categories."categoryId"=categories.id 
        WHERE recipe_categories."recipeId"=${recipe.id};`
      );

      recipe.ingredients = ingredients;
      recipe.categories = categories;
    }

    return recipes;
  } catch (error) {
    console.error(error);
  }
};

const updateRecipe = async () => {};

module.exports = {
  createRecipe,
  deleteRecipe,
  getAccountRecipes,
  getRecipe,
  getRecipesByCategory,
};
