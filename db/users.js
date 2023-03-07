const client = require("./client");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createUser = async ({
  email,
  name,
  password,
  accountId,
  primaryUser,
}) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(email, name, password, "accountId", "primaryUser") 
          VALUES ($1, $2, $3, $4, $5) 
          ON CONFLICT (email) DO NOTHING
          RETURNING id, email, name, admin, "accountId", "primaryUser";`,
      [email, name, hashedPassword, accountId, primaryUser]
    );

    return user;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  try {
    const { rows: users } = await client.query(
      `SELECT id, email, name, admin, "accountId", "primaryUser" FROM users;`
    );

    return users;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async ({ email, password }) => {
  try {
    const user = await getUserByEmail(email);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      const {
        rows: [user],
      } = await client.query(
        `SELECT id, email, name, admin, "accountId", "primaryUser" FROM users
        WHERE email=$1;`,
        [email]
      );
      return user;
    }
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM USERS WHERE email=$1;`, [email]);

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

const updateUser = async ({ id, ...fields }) => {
  const setStr = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setStr.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `UPDATE users SET ${setStr} WHERE id=${id} RETURNING id, email, name, admin, "accountId", "primaryUser";`,
      Object.values(fields)
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
};

const verifyGoogleUser = async (issuer, profile, cb) => {
  client.query(
    "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
    [issuer, profile.id],
    function (err, row) {
      if (err) {
        return cb(err);
      }
      if (!row) {
        client.query(
          "INSERT INTO users (name) VALUES (?)",
          [profile.displayName],
          function (err) {
            if (err) {
              return cb(err);
            }

            var id = this.lastID;
            client.query(
              "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
              [id, issuer, profile.id],
              function (err) {
                if (err) {
                  return cb(err);
                }
                var user = {
                  id: id,
                  name: profile.displayName,
                };
                return cb(null, user);
              }
            );
          }
        );
      } else {
        client.query(
          "SELECT * FROM users WHERE id = ?",
          [row.user_id],
          function (err, row) {
            if (err) {
              return cb(err);
            }
            if (!row) {
              return cb(null, false);
            }
            return cb(null, row);
          }
        );
      }
    }
  );
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  getUserById,
  updateUser,
  verifyGoogleUser,
};
