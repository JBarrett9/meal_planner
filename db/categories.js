const client = require("./client");

const addCategoryToRecipe = async ({ recipeId, categoryId }) => {
  try {
    const {
      rows: [recipeCategory],
    } = await client.query(
      `INSERT INTO recipe_categories("recipeId", "categoryId")
            VALUES ($1, $2)
            RETURNING *;`,
      [recipeId, categoryId]
    );

    return recipeCategory;
  } catch (error) {
    console.error(error);
  }
};

const createCategory = async (name) => {
  try {
    const {
      rows: [category],
    } = await client.query(
      `INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *;`,
      [name]
    );

    return category;
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const {
      rows: [category],
    } = await client.query(
      `DELETE FROM categories WHERE id=($1) RETURNING *;`,
      [id]
    );

    return category;
  } catch (error) {
    console.error(error);
  }
};

const getAllCategories = async () => {
  try {
    const { rows: categories } = await client.query(
      `SELECT * FROM categories;`
    );

    return categories;
  } catch (error) {
    console.error(error);
  }
};

const getCategoryById = async (id) => {
  try {
    const {
      rows: [category],
    } = await client.query(`SELECT * FROM categories WHERE id=$1;`, [id]);

    return category;
  } catch (error) {
    console.error(error);
  }
};

const getCategoriesByRecipeId = async (recipeId) => {
  try {
    const { rows: categories } = await client.query(
      `SELECT * FROM categories
        JOIN recipe_categories ON recipe_categories."categoryId"=categories.id
        WHERE recipe_categories."recipeId"=$1;`,
      [recipeId]
    );

    return categories;
  } catch (error) {
    console.error(error);
  }
};

const removeCategoryFromRecipe = async (recipeCategoryId) => {
  try {
    const {
      rows: [recipeCategory],
    } = await client.query(
      `DELETE FROM recipe_categories WHERE id=($1) RETURNING *;`,
      [recipeCategoryId]
    );

    return recipeCategory;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addCategoryToRecipe,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoriesByRecipeId,
  removeCategoryFromRecipe,
};
