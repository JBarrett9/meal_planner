const express = require("express");
const { addIngredientToInventory } = require("../db/ingredients");
const { getInventory } = require("../db/inventories");
const router = express.Router();
const { requireUser } = require("./utils");

router.post("/", requireUser, async (req, res, next) => {
  const { accountId } = req.body;
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/:accountId", requireUser, async (req, res, next) => {
  const { accountId } = req.params;
  if (user.accountId !== accountId) {
    next({
      error: "unauthorizedAccessError",
      message: "User is not authorized to access this inventory",
      name: "unauthorizedAccessError",
    });
  } else {
    try {
      const inventory = await getInventory(accountId);
      res.send(inventory);
    } catch (error) {
      next(error);
    }
  }
});

router.post(
  "/:inventoryId/ingredients",
  requireUser,
  async (req, res, next) => {
    const { inventoryId } = req.params;
    const { ingredientId, qty, unit } = req.body;
    try {
      const inventoryIngredient = await addIngredientToInventory({
        inventoryId,
        ingredientId,
        qty,
        unit,
      });

      res.send({ message: "success", data: inventoryIngredient });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
