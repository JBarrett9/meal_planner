const express = require("express");
const {
  createList,
  getList,
  getListsByAccountId,
  getListsByUserId,
  getAccountActiveLists,
} = require("../db/lists");
const { requireUser } = require("./utils");
const router = express.Router();

router.get("/list/:listId", requireUser, async (req, res, next) => {
  const { listId } = req.params;
  try {
    const list = await getList(listId);
    if (list.accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this list`,
        message: `User is not authorized to access this list`,
        name: `UserAccountMismatchError`,
      });
    }
    res.send(list);
  } catch (error) {
    next(error);
  }
});

router.get("/account/:accountId", requireUser, async (req, res, next) => {
  const { accountId } = req.params;
  try {
    if (accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }

    const lists = await getListsByAccountId(accountId);
    res.send(lists);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/account/:accountId/active",
  requireUser,
  async (req, res, next) => {
    const { accountId } = req.params;
    try {
      if (accountId !== req.user.accountId) {
        res.status(403).send({
          error: `User is not authorized to access this account`,
          message: `User is not authorized to access this account`,
          name: `UserAccountMismatchError`,
        });
      }

      const lists = await getAccountActiveLists(accountId);
      res.send(lists);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/account/:accountId", requireUser, async (req, res, next) => {
  try {
    const { accountId } = req.params;
    if (accountId !== req.user.accountId) {
      res.status(403).send({
        error: `User is not authorized to access this account`,
        message: `User is not authorized to access this account`,
        name: `UserAccountMismatchError`,
      });
    }
    const userId = req.user.id;
    const active = true;
    const created = new Date();

    const list = await createList({ active, accountId, userId, created });
    res.send(list);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user.id) {
    res.status(403).send({
      error: `User is not authorized to access this account`,
      message: `User is not authorized to access this account`,
      name: `UserAccountMismatchError`,
    });
  }
  try {
    const lists = await getListsByUserId(userId);
    res.send(lists);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
