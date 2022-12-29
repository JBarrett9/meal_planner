const { faker } = require("@faker-js/faker");
const { addCategoryToRecipe } = require("../../db/categories");
const {
  createRecipe,
  getAccountRecipes,
  getRecipe,
  getRecipesByCategory,
} = require("../../db/recipes");
const {
  createTestUser,
  createTestRecipe,
  createTestCategory,
} = require("../helpers");

describe("DB recipes", () => {
  describe("createRecipe", () => {
    it("Creates a recipe and returns a recipe object", async () => {
      const testUser = await createTestUser();
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

      expect(typeof testRecipe.id).toEqual("number");
      expect(testRecipe.steps).toEqual(testRecipeData.steps);
      expect(testRecipe.description).toEqual(testRecipeData.description);
      expect(testRecipe.accountId).toEqual(testRecipeData.accountId);
      expect(testRecipe.creatorId).toEqual(testRecipeData.userId);
      expect(testRecipe.url).toEqual(testRecipeData.url);
      expect(testRecipe.source).toEqual(testRecipeData.source);
      expect(testRecipe.public).toEqual(testRecipeData.pub);
    });
  });

  describe("getAccountRecipes", () => {
    it("Returns an array of recipes associated with an account", async () => {
      const testRecipeData = await createTestRecipe();
      await createTestRecipe({
        accountId: testRecipeData.accountId,
        id: testRecipeData.creatorId,
      });
      await createTestRecipe();

      const recipes = await getAccountRecipes(testRecipeData.accountId);

      expect(recipes.length).toEqual(2);

      const testRecipe = recipes.find(
        (recipe) => recipe.id === testRecipeData.id
      );

      expect(testRecipe.steps).toEqual(testRecipeData.steps);
      expect(testRecipe.description).toEqual(testRecipeData.description);
      expect(testRecipe.accountId).toEqual(testRecipeData.accountId);
      expect(testRecipe.creatorId).toEqual(testRecipeData.creatorId);
      expect(testRecipe.url).toEqual(testRecipeData.url);
      expect(testRecipe.source).toEqual(testRecipeData.source);
      expect(testRecipe.public).toEqual(testRecipeData.public);
    });
  });

  describe("getRecipe", () => {
    it("Returns the recipe for the given id", async () => {
      const testRecipeData = await createTestRecipe();
      const testRecipe = await getRecipe(testRecipeData.id);

      expect(testRecipe.steps).toEqual(testRecipeData.steps);
      expect(testRecipe.description).toEqual(testRecipeData.description);
      expect(testRecipe.accountId).toEqual(testRecipeData.accountId);
      expect(testRecipe.creatorId).toEqual(testRecipeData.creatorId);
      expect(testRecipe.url).toEqual(testRecipeData.url);
      expect(testRecipe.source).toEqual(testRecipeData.source);
      expect(testRecipe.public).toEqual(testRecipeData.public);
    });
  });

  describe("getRecipesByCategory", () => {
    it("Returns an array of recipes for the given category", async () => {
      const testCategory = await createTestCategory();
      const testRecipeData = await createTestRecipe();
      const r2 = await createTestRecipe({
        accountId: testRecipeData.accountId,
        id: testRecipeData.creatorId,
      });

      await createTestRecipe({
        accountId: testRecipeData.accountId,
        id: testRecipeData.creatorId,
      });

      await addCategoryToRecipe({
        recipeId: testRecipeData.id,
        categoryId: testCategory.id,
      });
      await addCategoryToRecipe({
        recipeId: r2.id,
        categoryId: testCategory.id,
      });

      const recipes = await getRecipesByCategory(
        testCategory.id,
        testRecipeData.accountId
      );

      expect(recipes.length).toEqual(2);

      const testRecipe = recipes.find(
        (recipe) => recipe.recipeId === testRecipeData.id
      );

      expect(testRecipe.steps).toEqual(testRecipeData.steps);
      expect(testRecipe.description).toEqual(testRecipeData.description);
      expect(testRecipe.accountId).toEqual(testRecipeData.accountId);
      expect(testRecipe.creatorId).toEqual(testRecipeData.creatorId);
      expect(testRecipe.url).toEqual(testRecipeData.url);
      expect(testRecipe.source).toEqual(testRecipeData.source);
      expect(testRecipe.public).toEqual(testRecipeData.public);
    });
  });
});
