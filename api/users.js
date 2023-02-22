require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, G_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");

const {
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
  getAllUsers,
} = require("../db/users");
const { createAccount } = require("../db/accounts");
const { createInventory, getInventory } = require("../db/inventories");

const validateRecaptcha = async (response_key) => {
  try {
    const secret_key = G_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

    const response = await fetch(url, {
      method: "POST",
    });

    const result = response.json();
    return result.success == true;
  } catch (error) {
    return error;
  }
};

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      error: "MissingCredentialsError",
      name: "MissingCredentialsError",
      message: "Missing username or password",
    });
  }
  try {
    const user = await getUserByEmail(email);
    if (user) {
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordsMatch) {
        let token = jwt.sign(user, JWT_SECRET);
        let userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          admin: user.admin,
          accountId: user.accountId,
          primaryUser: user.primaryUser,
        };
        res.send({
          user: userData,
          message: "Login succeeded",
          success: true,
          token,
        });
      }
    } else {
      next({
        error: "IncorrectCredentialsError",
        name: "IncorrectCredentialsError",
        message: "E-mail address or password is incorrect.",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  let { email, password, name, accountId, recaptchaResponse } = req.body;
  const human = await validateRecaptcha(recaptchaResponse);
  if (!human) {
    return res.status(401).send({
      error: "reCaptchaFailedError",
      name: "reCaptchaFailedError",
      message: `Could not verify that the user is human`,
    });
  }
  const _user = await getUserByEmail(email);
  if (_user) {
    next({
      error: "UserAlreadyExistsError",
      name: "UserAlreadyExistsError",
      message: `An account for ${email} already exists.`,
    });
    return;
  }
  if (password.length < 8) {
    next({
      error: "InvalidPasswordError",
      name: "InvalidPasswordError",
      message: "Password must be 8 or more characters.",
    });
    return;
  }

  try {
    if (!accountId) {
      const account = await createAccount(name);
      accountId = account.id;
      primaryUser = true;
    } else {
      primaryUser = false;
    }
    const user = await createUser({
      email,
      name,
      password,
      accountId,
      primaryUser,
    });
    await createInventory(accountId);

    let token = jwt.sign(user, JWT_SECRET);

    res.send({
      user,
      message: "User successfully registered",
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/admin/user/:userId", requireAdmin, async (req, res, next) => {
  const { userId } = req.params;
  const { name, password, admin } = req.body;
  let updateFields = { name, password, admin };

  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const user = getUserById(userId);

  if (!user) {
    next({
      error: "UserNotFoundError",
      name: "UserNotFoundError",
      message: "User does not exist.",
    });
  }

  try {
    const updatedUser = await updateUser({ id: userId, ...updateFields });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { name, password } = req.body;
  let updateFields = { name, password };
  Object.keys(updateFields).forEach(function (key, idx) {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  const user = getUserById(userId);

  if (!user) {
    next({
      error: "UserNotFound",
      name: "User Not Found",
      message: "Unable to find a user associated to that ID.",
    });
  }
  if (userId !== user.id && req.user.admin === false) {
    next({
      error: "UnauthorizedError",
      name: "UnauthorizedError",
      message: "You are not authorized to access this account",
    });
  }

  try {
    const updatedUser = await updateUser({ id: userId, ...updateFields });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res, next) => {
  const users = await getAllUsers();
  res.send(users);
});

module.exports = router;
