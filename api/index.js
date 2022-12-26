const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
router.use(express.json());

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    let token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.get("/health", async (req, res, next) => {
  try {
    res.send({ success: true, message: "I'm a healthy server!" });
  } catch (error) {
    next(error);
  }
});

router.use("*", (req, res) => {
  res.status(404);
  res.send({
    name: "PageNotFound",
    message: "Page not found.",
  });
});

router.use((error, req, res, next) => {
  res.status(500).send({
    error: true,
    name: error.name,
    message: error.message,
  });
});

router.use((error, req, res, next) => {
  res.send({
    error: true,
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
