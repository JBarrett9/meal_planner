require("dotenv").config();
const { Pool } = require("pg");
const { DB_PASS } = process.env;

const client = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: "postgres",
        password: DB_PASS,
        database: "meal-planner",
      }
);

module.exports = client;
