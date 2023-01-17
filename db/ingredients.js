const client = require("./client");

const addIngredientToInventory = async ({
  inventoryId,
  ingredientId,
  qty,
  unit,
}) => {
  try {
    const {
      rows: [inventoryIngredient],
    } = await client.query(
      `INSERT INTO inventory_ingredients("inventoryId", "ingredientId", qty, unit) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;`,
      [inventoryId, ingredientId, qty, unit]
    );

    return inventoryIngredient;
  } catch (error) {
    console.error(error);
  }
};

const addIngredientToList = async ({ listId, ingredientId, qty, unit }) => {
  try {
    const {
      rows: [listIngredient],
    } = await client.query(
      `INSERT INTO list_ingredients("listId", "ingredientId", qty, unit) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;`,
      [listId, ingredientId, qty, unit]
    );

    return listIngredient;
  } catch (error) {
    console.error(error);
  }
};

const addIngredientToRecipe = async ({
  recipeId,
  ingredientId,
  qty,
  unit,
  order,
}) => {
  try {
    const {
      rows: [recipeIngredient],
    } = await client.query(
      `INSERT INTO recipe_ingredients("recipeId", "ingredientId", qty, unit, position) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *;`,
      [recipeId, ingredientId, qty, unit, order]
    );

    return recipeIngredient;
  } catch (error) {
    console.error(error);
  }
};

const createIngredient = async ({
  name,
  conversion,
  calories,
  type,
  nutrition,
  creatorId,
}) => {
  try {
    const {
      rows: [ingredient],
    } = await client.query(
      `INSERT INTO ingredients (name, conversion, calories, type, nutrition, "creatorId")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
      [name, conversion, calories, type, nutrition, creatorId]
    );

    return ingredient;
  } catch (error) {
    console.error(error);
  }
};

const deleteIngredient = async (id) => {
  try {
    const {
      rows: [ingredient],
    } = await client.query(
      `DELETE FROM ingredients WHERE id=($1) RETURNING *;`,
      [id]
    );

    return ingredient;
  } catch (error) {
    console.error(error);
  }
};

const getAllIngredients = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM ingredients;`);

    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getIngredientById = async (id) => {
  try {
    const {
      rows: [ingredient],
    } = await client.query(`SELECT * FROM ingredients WHERE id=$1;`, [id]);

    return ingredient;
  } catch (error) {
    console.error(error);
  }
};

const removeIngredientFromInventory = async (inventoryIngredientId) => {
  try {
    const {
      rows: [inventoryIngredient],
    } = await client.query(
      `DELETE FROM inventory_ingredients WHERE id=($1) RETURNING *;`,
      [inventoryIngredientId]
    );

    return inventoryIngredient;
  } catch (error) {
    console.error(error);
  }
};

const removeIngredientFromList = async (listIngredientId) => {
  try {
    const {
      rows: [listIngredient],
    } = await client.query(
      `DELETE FROM list_ingredients WHERE id=($1) RETURNING *;`,
      [listIngredientId]
    );

    return listIngredient;
  } catch (error) {
    console.error(error);
  }
};

const removeIngredientFromRecipe = async (recipeIngredientId) => {
  try {
    const {
      rows: [recipeIngredient],
    } = await client.query(
      `DELETE FROM recipe_ingredients WHERE id=($1) RETURNING *;`,
      [recipeIngredientId]
    );

    return recipeIngredient;
  } catch (error) {
    console.error(error);
  }
};

const updateIngredient = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [ingredient],
    } = await client.query(
      `UPDATE ingredients SET ${setStr} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    return ingredient;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addIngredientToInventory,
  addIngredientToList,
  addIngredientToRecipe,
  createIngredient,
  deleteIngredient,
  getAllIngredients,
  getIngredientById,
  removeIngredientFromInventory,
  removeIngredientFromList,
  removeIngredientFromRecipe,
  updateIngredient,
};
