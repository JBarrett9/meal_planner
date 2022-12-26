const jwt = require("jsonwebtoken");
const { faker } = require("@faker-js/faker");
const { createAccount } = require("../db/accounts");
const { createUser } = require("../db/users");
const { createMeal } = require("../db/meals");
const { createCategory } = require("../db/categories");
const { createRecipe } = require("../db/recipes");
const { JWT_SECRET } = process.env;

const createTestAccount = async () => {
  const testAccount = await createAccount("test account");

  if (!testAccount) {
    throw new Error("createAccount did not return an acount");
  }

  return testAccount;
};

const createTestUser = async () => {
  const account = await createTestAccount();
  const testUserData = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: faker.internet.password(),
    accountId: account.id,
    primaryUser: true,
  };

  const testUser = await createUser(testUserData);

  if (!testUser) {
    throw new Error("createUser did not return a user");
  }

  return testUser;
};

const createTestMeal = async (testUser) => {
  if (!testUser) {
    testUser = await createTestUser();
  }

  const testMealData = {
    accountId: testUser.accountId,
    userId: testUser.id,
    date: faker.date.future(1),
    time: Number(faker.random.numeric(2)),
  };
  const testMeal = await createMeal(testMealData);

  if (!testMeal) {
    throw new Error("createMeal did not return a meal");
  }

  return testMeal;
};

const createTestRecipe = async (testUser) => {
  if (!testUser) {
    testUser = await createTestUser();
  }

  const testRecipeData = {
    steps: faker.lorem.lines(5),
    description: faker.lorem.paragraph(),
    accountId: testUser.accountId,
    userId: testUser.id,
    url: faker.internet.url(),
    source: "website",
    pub: false,
  };

  const testRecipe = await createRecipe(testRecipeData);

  if (!testRecipe) {
    throw new Error("testRecipe did not return a recipe");
  }

  return testRecipe;
};

const createTestCategory = async () => {
  const testCategory = await createCategory(faker.word.adjective());

  if (!testCategory) {
    throw new Error("createCategory did not return a category");
  }

  return testCategory;
};

module.exports = {
  createTestAccount,
  createTestUser,
  createTestMeal,
  createTestRecipe,
  createTestCategory,
};
