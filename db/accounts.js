const client = require("./client");

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
