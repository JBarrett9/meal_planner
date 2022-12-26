function requireUser(req, res, next) {
  if (!req.user) {
    next({
      error: "UnauthorizedError",
      name: "UnauthorizedError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

async function requireAdmin(req, res, next) {
  if (!req.user) {
    next({
      error: "UnauthorizedError",
      name: "UnauthorizedError",
      message: "You must be logged in to perform this action",
    });
    return;
  }

  const { email } = req.user;
  const user = await getUserByEmail(email);

  if (!user.admin) {
    next({
      error: "UnauthorizedError",
      name: "UnauthorizedError",
      message: "You must be an admin perform this action",
    });
  }
  next();
}

module.exports = {
  requireUser,
  requireAdmin,
};
