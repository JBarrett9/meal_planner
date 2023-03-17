const express = require("express");
const router = express.Router();
const { verifyToken } = require("./authentication");

router.use(express.json());

router.use(async (req, res, next) => {
  try {
    const id = verifyToken(req.body.idToken);

    if (id) {
      req.user = await getUserById(id);
      next();
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get("/health", async (req, res, next) => {
  try {
    res.send({ success: true, message: "I'm a healthy server!" });
  } catch (error) {
    next(error);
  }
});

const categoriesRouter = require("./categories");
const ingredientsRouter = require("./ingredients");
const inventoriesRouter = require("./inventories");
const listsRouter = require("./lists");
const mealsRouter = require("./meals");
const recipesRouter = require("./recipes");
const usersRouter = require("./users");
const { verifyToken } = require("./authentication");

router.use("/categories", categoriesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/inventories", inventoriesRouter);
router.use("/lists", listsRouter);
router.use("/meals", mealsRouter);
router.use("/recipes", recipesRouter);
router.use("/users", usersRouter);

router.use("*", (req, res) => {
  res.status(404);
  res.send({
    name: "PageNotFound",
    message: "Page not found.",
  });
});

router.use((error, req, res, next) => {
  res.status(500).send({
    error: error.error,
    name: error.name,
    message: error.message,
  });
});

router.use((error, req, res, next) => {
  res.send({
    error: error.error,
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
