const { client } = require("./client");
const bcrypt = require("bcrypt");
require("dotenv").config();

const addUser = async ({ guid, accountId, primaryUser }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(guid, "accountId", "primaryUser") 
          VALUES ($1, $2, $3) 
          ON CONFLICT (email) DO NOTHING
          RETURNING id, guid, admin, "accountId", "primaryUser";`,
      [guid, accountId, primaryUser]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT id, email, name, admin, "accountId", "primaryUser" FROM users
            WHERE id=$1;`,
      [userId]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addUser,
  getUserById,
};
