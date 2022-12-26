const { faker } = require("@faker-js/faker");
const { createRecipe, getAccountRecipes } = require("../../db/recipes");
const { createTestUser, createTestRecipe } = require("../helpers");

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

  describe("getRecipe", () => {});

  describe("getRecipesByCategory", () => {});
});
