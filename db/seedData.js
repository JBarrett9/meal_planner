const { createAccount } = require("./accounts");
const client = require("./client");
const { EMAIL, USER_PASS } = process.env;
const {
  createIngredient,
  addIngredientToRecipe,
  addIngredientToList,
} = require("./ingredients");
const { createList } = require("./lists");
const { createRecipe } = require("./recipes");
const { createUser, updateUser } = require("./users");

const dropTables = async () => {
  try {
    console.log("-- Dropping Tables --");
    await client.query(`
        DROP TABLE IF EXISTS list_ingredients;
        DROP TABLE IF EXISTS lists;
        DROP TABLE IF EXISTS inventory_ingredients;
        DROP TABLE IF EXISTS inventories;
        DROP TABLE IF EXISTS recipe_categories;
        DROP TABLE IF EXISTS recipe_ingredients;
        DROP TABLE IF EXISTS meal_recipes;
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS meals;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS accounts;
        `);
    console.log("-- Tables Dropped --");
  } catch (error) {
    console.error(error);
  }
};

const createTables = async () => {
  try {
    console.log("-- Creating Tables --");
    console.log("Creating ingredients table ...");

    console.log("Creating table accounts ...");
    await client.query(`CREATE TABLE accounts(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)
    );`);

    console.log("Creating table users ...");
    await client.query(`CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "accountId" INTEGER REFERENCES accounts(id),
            "primaryUser" BOOLEAN,
            admin BOOLEAN DEFAULT false
        );`);

    await client.query(`CREATE TABLE ingredients(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          conversion INTEGER,
          calories INTEGER,
          type VARCHAR(255),
          nutrition TEXT,
          "creatorId" INTEGER REFERENCES users(id) 
      );`);

    console.log("Creating table meals ...");
    await client.query(`CREATE TABLE meals(
          id SERIAL PRIMARY KEY,
          "accountId" INTEGER REFERENCES accounts(id),
          "creatorId" INTEGER REFERENCES users(id),
          date DATE,
          time INTEGER
        );`);

    console.log("Creating table lists ...");
    await client.query(`CREATE TABLE lists(
            id SERIAL PRIMARY KEY,
            active BOOLEAN DEFAULT true,
            name VARCHAR(255),
            "accountId" INTEGER REFERENCES accounts(id),
            "creatorId" INTEGER REFERENCES users(id),
            created DATE DEFAULT CURRENT_DATE
        );`);

    console.log("Creating table inventories ...");
    await client.query(`CREATE TABLE inventories(
            id SERIAL PRIMARY KEY,
            "accountId" INTEGER REFERENCES accounts(id)
        );`);

    console.log("Creating table categories ...");
    await client.query(`CREATE TABLE categories(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
        );`);

    console.log("Creating table recipes ...");
    await client.query(`CREATE TABLE recipes(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        steps TEXT,
        description TEXT,
        "accountId" INTEGER REFERENCES accounts(id),
        "creatorId" INTEGER REFERENCES users(id),
        source VARCHAR(255),
        public BOOLEAN DEFAULT false
    );`);

    console.log("Creating table meal_recipes...");
    await client.query(`CREATE TABLE meal_recipes(
      id SERIAL PRIMARY KEY,
      "mealId" INTEGER REFERENCES meals(id),
      "recipeId" INTEGER REFERENCES recipes(id)
    );`);

    console.log("Creating table list_ingredients ...");
    await client.query(`CREATE TABLE list_ingredients(
        id SERIAL PRIMARY KEY,
        "listId" INTEGER REFERENCES lists(id),
        "ingredientId" INTEGER REFERENCES ingredients(id),
        qty FLOAT,
        unit VARCHAR(255)
    );`);

    console.log("Creating table inventory_ingredients ...");
    await client.query(`CREATE TABLE inventory_ingredients(
        id SERIAL PRIMARY KEY,
        "inventoryId" INTEGER REFERENCES inventories(id),
        "ingredientId" INTEGER REFERENCES ingredients(id),
        qty FLOAT,
        unit VARCHAR(255)
    );`);

    console.log("Creating table recipe_ingredients ...");
    await client.query(`CREATE TABLE recipe_ingredients(
        id SERIAL PRIMARY KEY,
        "recipeId" INTEGER REFERENCES recipes(id),
        "ingredientId" INTEGER REFERENCES ingredients(id),
        qty FLOAT,
        unit VARCHAR(255),
        position INTEGER
    );`);

    console.log("Creating table recipe_categories ...");
    await client.query(`CREATE TABLE recipe_categories(
        id SERIAL PRIMARY KEY,
        "recipeId" INTEGER REFERENCES recipes(id),
        "categoryId" INTEGER REFERENCES categories(id)
    );`);

    console.log("-- Tables Built --");
  } catch (error) {
    console.error(error);
  }
};

const populate = async () => {
  const account = await createAccount("First Test Account");

  const user = await createUser({
    email: "test@mail.com",
    name: "Test User",
    password: "testPassword1",
    accountId: account.id,
    primaryUser: true,
  });

  const adminAccount = await createAccount("Admin Account");

  const admin = await createUser({
    email: EMAIL,
    name: "James",
    password: USER_PASS,
    accountId: adminAccount.id,
    primaryUser: true,
  });

  await updateUser({ id: admin.id, admin: true });

  const carrot = await createIngredient({
    name: "carrot",
    conversion: 128,
    calories: 53,
    type: "vegetable",
    nutrition: "",
  });

  const onion = await createIngredient({
    name: "onion",
    conversion: 160,
    calories: 64,
    type: "vegetable",
    nutrition: "",
  });

  const celery = await createIngredient({
    name: "celery",
    conversion: 101,
    calories: 16,
    type: "vegetable",
    nutrition: "",
  });

  const potato = await createIngredient({
    name: "russet potatoes",
    conversion: 122,
    calories: 113,
    type: "vegetable",
    nutrition: "",
  });

  const butter = await createIngredient({
    name: "butter",
    conversion: 227,
    calories: 1627,
    type: "dairy",
    nutrition: "",
  });

  const flour = await createIngredient({
    name: "flour",
    conversion: 455,
    calories: 125,
    type: "grain",
    nutrition: "",
  });

  const milk = await createIngredient({
    name: "whole milk",
    conversion: 244,
    calories: 149,
    type: "dairy",
    nutrition: "",
  });

  const salt = await createIngredient({
    name: "salt",
    conversion: 292,
    calories: 0,
    type: "mineral",
    nutrition: "",
  });

  const cheese = await createIngredient({
    name: "cheddar cheese",
    conversion: 113,
    calories: 455,
    type: "dairy",
    nutrition: "",
  });

  const recipe = await createRecipe({
    steps:
      "Preheat the oven to 400 degrees F (200 degrees C). Butter a 1-quart casserole dish. Layer 1/2 of the potatoes in the bottom of the prepared casserole dish; season with salt and pepper. Layer onion slices over top, then top with with remaining potatoes. Season again with salt and pepper. Melt butter in a medium saucepan over medium heat. Gradually whisk in flour and salt and cook, whisking constantly until raw flour flavor has cooked off, about 1 minute. Gradually add milk, about 1/4 cup at a time, whisking well after each addition to incorporate; the gradual addition and whisking of milk will help avoid lumps in your sauce. Cook, whisking constantly, until the mixture has thickened, 3 to 5 minutes. Stir in cheese all at once; continue stirring until melted, 30 to 60 seconds. Pour cheese sauce over the potatoes, and cover the dish with aluminum foil. Bake in the preheated oven until potatoes are tender and sauce is bubbly, about 1 1/2 hours.",
    description: "",
    accountId: account.id,
    userId: user.id,
    source: "",
    public: false,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: potato.id,
    qty: 4,
    unit: "medium potato",
    order: 1,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: onion.id,
    qty: 1,
    unit: "medium onion",
    order: 2,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: butter.id,
    qty: 3,
    unit: "tbsp",
    order: 3,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: flour.id,
    qty: 3,
    unit: "tbsp",
    order: 4,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: butter.id,
    qty: 0.5,
    unit: "tsp",
    order: 5,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: milk.id,
    qty: 2,
    unit: "cup",
    order: 6,
  });

  addIngredientToRecipe({
    recipeId: recipe.id,
    ingredientId: cheese.id,
    qty: 1.5,
    unit: "cup",
    order: 7,
  });

  const list = await createList({
    active: true,
    accountId: account.id,
    userId: user.id,
    created: "2022-12-22",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: potato.id,
    qty: 4,
    unit: "medium potato",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: onion.id,
    qty: 1,
    unit: "medium onion",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: butter.id,
    qty: 3,
    unit: "tbsp",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: flour.id,
    qty: 3,
    unit: "tbsp",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: butter.id,
    qty: 0.5,
    unit: "tsp",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: milk.id,
    qty: 2,
    unit: "cup",
  });

  addIngredientToList({
    recipeId: list.id,
    ingredientId: cheese.id,
    qty: 1.5,
    unit: "cup",
  });
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await populate();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createTables,
  dropTables,
  populate,
};

module.exports = { rebuildDB };
