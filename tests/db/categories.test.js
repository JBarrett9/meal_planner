const { faker } = require("@faker-js/faker");
const {
  addCategoryToRecipe,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoriesByRecipeId,
  removeCategoryFromRecipe,
} = require("../../db/categories");
const { createRecipe, getRecipe } = require("../../db/recipes");
const { createTestRecipe, createTestCategory } = require("../helpers");

const testRecipe = { steps: "", description: "" };

describe("DB categories", () => {
  describe("addCategoryToRecipe", () => {
    it("Adds a category to a recipe", async () => {
      const recipe = await createTestRecipe();
      const testCategoryData = await createTestCategory();
      await addCategoryToRecipe({
        recipeId: recipe.id,
        categoryId: testCategoryData.id,
      });

      const testRecipe = await getRecipe(recipe.id);

      const testCategory = testRecipe.categories.find(
        (category) => category.id === testCategoryData.id
      );

      expect(testCategory.name).toEqual(testCategoryData.name);
    });
  });

  describe("createCategory", () => {
    it("Creates a category and returns the category object", async () => {
      const testName = faker.word.adjective();
      const testCategory = await createCategory(testName);

      expect(typeof testCategory.id).toEqual("number");
      expect(testCategory.name).toEqual(testName);
    });
  });

  describe("deleteCategory", () => {
    it("Deletes a category and returns the category object", async () => {
      const testCategoryData = await createTestCategory();
      const testCategory = await deleteCategory(testCategoryData.id);

      const categories = await getAllCategories();
      const deletedCategory = categories.find(
        (category) => category.id === testCategoryData.id
      );

      expect(deletedCategory).toBeFalsy();
      expect(testCategory.id).toEqual(testCategoryData.id);
      expect(testCategory.name).toEqual(testCategoryData.name);
    });
  });

  describe("getAllCategories", () => {
    it("Returns an array of all categories", async () => {
      const testCategoryData = await createTestCategory();
      const categories = await getAllCategories();
      const testCategory = categories.find(
        (category) => category.id === testCategoryData.id
      );

      expect(testCategory.name).toEqual(testCategoryData.name);
    });
  });

  describe("getCategoryById", () => {
    it("Returns the category for the given id", async () => {
      const testCategoryData = await createTestCategory();
      const testCategory = await getCategoryById(testCategoryData.id);

      expect(testCategory.name).toEqual(testCategoryData.name);
    });
  });

  describe("getCategoriesByRecipeId", () => {
    it("Returns an array of categories associated with the given recipe", async () => {
      const testRecipe = await createTestRecipe();
      const c1 = await createTestCategory();
      const c2 = await createTestCategory();
      const c3 = await createTestCategory();
      await createTestCategory();

      await addCategoryToRecipe({ recipeId: testRecipe.id, categoryId: c1.id });
      await addCategoryToRecipe({ recipeId: testRecipe.id, categoryId: c2.id });
      await addCategoryToRecipe({ recipeId: testRecipe.id, categoryId: c3.id });

      const recipeCategories = await getCategoriesByRecipeId(testRecipe.id);

      expect(recipeCategories.length).toEqual(3);

      const testCategory = recipeCategories.find(
        (recipeCategory) => recipeCategory.categoryId === c1.id
      );

      expect(testCategory.name).toEqual(c1.name);
    });
  });

  describe("removeCategoryFromRecipe", () => {
    it("Removes given category from the given recipe and returns the category object", async () => {
      const testRecipe = await createTestRecipe();
      const c1 = await createTestCategory();
      const c2 = await createTestCategory();

      await addCategoryToRecipe({ recipeId: testRecipe.id, categoryId: c1.id });
      const testRecipeCategory = await addCategoryToRecipe({
        recipeId: testRecipe.id,
        categoryId: c2.id,
      });

      const testCategory = await removeCategoryFromRecipe(
        testRecipeCategory.id
      );

      console.log(testCategory);

      expect(testCategory.categoryId).toEqual(c2.id);

      const recipeCategories = await getCategoriesByRecipeId(testRecipe.id);

      expect(recipeCategories.length).toEqual(1);

      const deletedCategory = recipeCategories.find(
        (recipeCategory) => recipeCategory.categoryId === c2.id
      );

      expect(deletedCategory).toBeFalsy();
    });
  });
});
