const { createIngredient } = require("../../db/ingredients");

describe("DB ingredients", () => {
  describe("addIngredientToInventory", () => {});

  describe("addIngredientToList", () => {});

  describe("addIngredientToRecipe", () => {});

  describe("createIngredient", () => {
    it("Creates an ingredient", async () => {
      const ingredientData = {
        name: "onion",
        conversion: "101",
        calories: "16",
        type: "vegetable",
        nutrition: "lorem ipsum",
      };

      const ingredient = await createIngredient(ingredientData);

      expect(ingredient.name).toEqual(ingredientData.name);
      expect(ingredient.conversion).toEqual(ingredientData.conversion);
      expect(ingredient.calories).toEqual(ingredientData.calories);
      expect(ingredient.type).toEqual(ingredientData.type);
      expect(ingredient.nutrition).toEqual(ingredientData.nutrition);
    });
  });

  describe("deleteIngredient", () => {});

  describe("getAllIngredients", () => {});

  describe("getIngredientById", () => {});

  describe("removeIngredientFromInventory", () => {});

  describe("removeIngredientFromList", () => {});

  describe("removeIngredientFromRecipe", () => {});

  describe("updateIngredient", () => {});
});
