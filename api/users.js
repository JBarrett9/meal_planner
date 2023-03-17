require("dotenv").config();
const express = require("express");
const router = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const { addUser, getUserById } = require("../db/users");
const { createAccount } = require("../db/accounts");
const { createInventory, getInventory } = require("../db/inventories");
const { verifyToken } = require("./authentication");

router.post("/", async (req, res, next) => {
  try {
    const { token, accountId, primaryUser } = req.body;
    const guid = verifyToken(token);

    const user = await addUser({ guid, accountId, primaryUser });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
