const { client } = require("./client");

const createInventory = async (accountId) => {
  try {
    const {
      rows: [inventory],
    } = await client.query(
      `INSERT INTO inventories("accountId") VALUES ($1) RETURNING *;`,
      [accountId]
    );

    return inventory;
  } catch (error) {
    console.error(error);
  }
};

const getInventory = async (accountId) => {
  try {
    const {
      rows: [inventory],
    } = await client.query(`SELECT * FROM inventories WHERE "accountId"=$1;`, [
      accountId,
    ]);

    const { rows: ingredients } = await client.query(
      `SELECT * FROM ingredients 
            JOIN inventory_ingredients ON inventory_ingredients."ingredientId"=ingredients.id 
            WHERE inventory_ingredients."inventoryId"=${inventory.id};`
    );

    inventory.ingredients = ingredients;

    return inventory;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createInventory,
  getInventory,
};
