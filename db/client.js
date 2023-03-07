require("dotenv").config();
const { Pool } = require("pg");
const { DB_PASS } = process.env;
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const randomstring = require("randomstring");

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

const sessionConfig = {
  store: new pgSession({
    pool: client,
    tableName: "session",
  }),
  name: "SID",
  secret: randomstring.generate({
    length: 14,
    charset: "alphanumeric",
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    aameSite: true,
    secure: false,
  },
};

module.exports = { client, sessionConfig };
