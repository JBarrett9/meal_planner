const client = require("./client");

const createList = async ({ active, accountId, userId, created }) => {
  try {
    const {
      rows: [list],
    } = await client.query(
      `INSERT INTO lists(active, "accountId", "creatorId", created) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;`,
      [active, accountId, userId, created]
    );

    return list;
  } catch (error) {
    console.error(error);
  }
};

const getList = async (id) => {
  try {
    const {
      rows: [list],
    } = await client.query(`SELECT * FROM lists WHERE id=$1;`, [id]);

    const { rows: ingredients } = await client.query(
      `SELECT * FROM ingredients 
      JOIN list_ingredients ON list_ingredients."ingredientId"=ingredients.id 
      WHERE list_ingredients."listId"=${list.id};`
    );

    list.ingredients = ingredients;

    return list;
  } catch (error) {
    console.error(error);
  }
};

const getListsByAccountId = async (accountId) => {
  try {
    const { rows: lists } = await client.query(
      `SELECT * FROM lists WHERE "accountId"=$1;`,
      [accountId]
    );

    for (let list of lists) {
      let { rows: ingredients } = await client.query(
        `SELECT * FROM ingredients 
            JOIN list_ingredients ON list_ingredients."ingredientId"=ingredients.id 
            WHERE list_ingredients."listId"=${list.id};`
      );

      list.ingredients = ingredients;
    }

    return lists;
  } catch (error) {
    console.error(error);
  }
};

const getListsByUserId = async (userId) => {
  try {
    const { rows: lists } = await client.query(
      `SELECT * FROM lists WHERE "creatorId"=$1;`,
      [userId]
    );

    for (let list of lists) {
      let { rows: ingredients } = await client.query(
        `SELECT * FROM ingredients 
            JOIN list_ingredients ON list_ingredients."ingredientId"=ingredients.id 
            WHERE list_ingredients."listId"=${list.id};`
      );

      list.ingredients = ingredients;
    }

    return lists;
  } catch (error) {
    console.error(error);
  }
};

const getAccountActiveLists = async (accountId) => {
  try {
    const { rows: lists } = await client.query(
      `SELECT * FROM lists WHERE "accountId"=$1 AND active=true;`,
      [accountId]
    );

    for (let list of lists) {
      let { rows: ingredients } = await client.query(
        `SELECT * FROM ingredients 
            JOIN list_ingredients ON list_ingredients."ingredientId"=ingredients.id 
            WHERE list_ingredients."listId"=${list.id};`
      );

      list.ingredients = ingredients;
    }

    return lists;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createList,
  getList,
  getListsByAccountId,
  getListsByUserId,
  getAccountActiveLists,
};
