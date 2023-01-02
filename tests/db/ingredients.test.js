const { faker } = require("@faker-js/faker");
const {
  createIngredient,
  addIngredientToInventory,
  addIngredientToList,
  addIngredientToRecipe,
  deleteIngredient,
  getAllIngredients,
  getIngredientById,
} = require("../../db/ingredients");
const { createInventory, getInventory } = require("../../db/inventories");
const { getList } = require("../../db/lists");
const { getRecipe } = require("../../db/recipes");
const {
  createTestUser,
  createTestIngredient,
  createTestList,
  createTestRecipe,
} = require("../helpers");

describe("DB ingredients", () => {
  describe("addIngredientToInventory", () => {
    it("Adds given ingredient to given inventory and returns inventoryIngredient object", async () => {
      const testUser = await createTestUser();
      const testInventory = await createInventory(testUser.accountId);
      const testIngredient = await createTestIngredient();
      const testInventoryIngredientData = {
        inventoryId: testInventory.id,
        ingredientId: testIngredient.id,
        qty: 1.5,
        unit: "cups",
      };
      const testInventoryIngredient = await addIngredientToInventory(
        testInventoryIngredientData
      );

      expect(typeof testInventoryIngredient.id).toEqual("number");
      expect(testInventoryIngredient.inventoryId).toEqual(
        testInventoryIngredientData.inventoryId
      );
      expect(testInventoryIngredient.ingredientId).toEqual(
        testInventoryIngredientData.ingredientId
      );
      expect(testInventoryIngredient.qty).toEqual(
        testInventoryIngredientData.qty
      );
      expect(testInventoryIngredient.unit).toEqual(
        testInventoryIngredientData.unit
      );

      const inventory = await getInventory(testInventory.id);

      const queriedIngredient = inventory.ingredients.find(
        (inventoryIngredient) =>
          inventoryIngredient.ingredientId === testIngredient.id
      );

      expect(queriedIngredient.name).toEqual(testIngredient.name);
    });
  });

  describe("addIngredientToList", () => {
    it("Adds given ingredient to given list and returns listIngredient object", async () => {
      const testList = await createTestList();
      const testIngredient = await createTestIngredient();
      const testListIngredientData = {
        listId: testList.id,
        ingredientId: testIngredient.id,
        qty: 12,
        unit: "ounces",
      };
      const testListIngredient = await addIngredientToList(
        testListIngredientData
      );

      expect(typeof testListIngredient.id).toEqual("number");
      expect(testListIngredient.listId).toEqual(testListIngredientData.listId);
      expect(testListIngredient.ingredientId).toEqual(
        testListIngredientData.ingredientId
      );
      expect(testListIngredient.qty).toEqual(testListIngredientData.qty);
      expect(testListIngredient.unit).toEqual(testListIngredientData.unit);

      const list = await getList(testList.id);

      const queriedIngredient = list.ingredients.find(
        (listIngredient) => listIngredient.ingredientId === testIngredient.id
      );

      expect(queriedIngredient.name).toEqual(testIngredient.name);
    });
  });

  describe("addIngredientToRecipe", () => {
    it("Adds given ingredient to given recipe and returns recipeIngredient object", async () => {
      const testRecipe = await createTestRecipe();
      const testIngredient = await createTestIngredient();
      const testRecipeIngredientData = {
        recipeId: testRecipe.id,
        ingredientId: testIngredient.id,
        qty: 500,
        unit: "ml",
      };

      const testRecipeIngredient = await addIngredientToRecipe(
        testRecipeIngredientData
      );

      expect(typeof testRecipeIngredient.id).toEqual("number");
      expect(testRecipeIngredient.recipeId).toEqual(
        testRecipeIngredientData.recipeId
      );
      expect(testRecipeIngredient.ingredientId).toEqual(
        testRecipeIngredientData.ingredientId
      );
      expect(testRecipeIngredient.qty).toEqual(testRecipeIngredientData.qty);
      expect(testRecipeIngredient.unit).toEqual(testRecipeIngredientData.unit);

      const recipe = await getRecipe(testRecipe.id);

      const queriedIngredient = recipe.ingredients.find(
        (recipeIngredient) =>
          recipeIngredient.ingredientId === testIngredient.id
      );

      expect(queriedIngredient.name).toEqual(testIngredient.name);
    });
  });

  describe("createIngredient", () => {
    it("Creates an ingredient", async () => {
      const testUser = await createTestUser();
      const ingredientData = {
        name: "onion",
        conversion: 101,
        calories: 16,
        type: "vegetable",
        nutrition: "lorem ipsum",
        creatorId: testUser.id,
      };

      const ingredient = await createIngredient(ingredientData);

      expect(ingredient.name).toEqual(ingredientData.name);
      expect(ingredient.conversion).toEqual(ingredientData.conversion);
      expect(ingredient.calories).toEqual(ingredientData.calories);
      expect(ingredient.type).toEqual(ingredientData.type);
      expect(ingredient.nutrition).toEqual(ingredientData.nutrition);
    });
  });

  describe("deleteIngredient", () => {
    it("Deletes an ingredient and returns the ingredient object", async () => {
      const testIngredientData = await createTestIngredient();
      const testIngredient = await deleteIngredient(testIngredientData.id);

      expect(testIngredient.id).toEqual(testIngredientData.id);
      expect(testIngredient.name).toEqual(testIngredientData.name);
      expect(testIngredient.conversion).toEqual(testIngredientData.conversion);
      expect(testIngredient.calories).toEqual(testIngredientData.calories);
      expect(testIngredient.type).toEqual(testIngredientData.type);
      expect(testIngredient.nutrition).toEqual(testIngredientData.nutrition);

      const ingredients = await getAllIngredients();
      const deletedIngredient = ingredients.find(
        (ingredient) => ingredient.id === testIngredientData.id
      );
      expect(deletedIngredient).toBeFalsy();
    });
  });

  describe("getAllIngredients", () => {
    it("Returns an array of all ingredients", async () => {
      const testIngredientData = await createTestIngredient();
      const ingredients = await getAllIngredients();
      const testIngredient = ingredients.find(
        (ingredient) => ingredient.id === testIngredientData.id
      );

      expect(testIngredient.name).toEqual(testIngredientData.name);
      expect(testIngredient.conversion).toEqual(testIngredientData.conversion);
      expect(testIngredient.calories).toEqual(testIngredientData.calories);
      expect(testIngredient.type).toEqual(testIngredientData.type);
      expect(testIngredient.nutrition).toEqual(testIngredientData.nutrition);
    });
  });

  describe("getIngredientById", () => {
    it("Returns the ingredient for the given id", async () => {
      const testIngredientData = await createTestIngredient();
      const testIngredient = await getIngredientById(testIngredientData.id);

      expect(testIngredient.name).toEqual(testIngredientData.name);
      expect(testIngredient.conversion).toEqual(testIngredientData.conversion);
      expect(testIngredient.calories).toEqual(testIngredientData.calories);
      expect(testIngredient.type).toEqual(testIngredientData.type);
      expect(testIngredient.nutrition).toEqual(testIngredientData.nutrition);
    });
  });

  describe("removeIngredientFromInventory", () => {});

  describe("removeIngredientFromList", () => {});

  describe("removeIngredientFromRecipe", () => {});

  describe("updateIngredient", () => {});
});
