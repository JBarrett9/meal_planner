const client = require("./client");

/**
 * Adds a new account to the database and returns an account object
 * 
 * @param {string} name 
 * @returns {{account}}
 */
const createAccount = async (name) => {
  try {
    const {
      rows: [account],
    } = await client.query(
      `INSERT INTO accounts(name) VALUES ($1) RETURNING *;`,
      [name]
    );

    return account;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createAccount,
};
