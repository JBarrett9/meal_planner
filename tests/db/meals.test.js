const {
  createMeal,
  getAccountMeals,
  getMeal,
  getUserMeals,
} = require("../../db/meals");
const { createTestUser, createTestMeal } = require("../helpers");

describe("DB meals", () => {
  describe("createMeal", () => {
    it("Creates a meal and returns meal object", async () => {
      const testUser = await createTestUser();
      const testMealData = {
        accountId: testUser.accountId,
        userId: testUser.id,
        date: "2022-12-28",
        time: 45,
      };
      const testMeal = await createMeal(testMealData);

      expect(typeof testMeal.id).toEqual("number");
      expect(testMeal.accountId).toEqual(testMealData.accountId);
      expect(testMeal.creatorId).toEqual(testMealData.userId);
      expect(testMeal.time).toEqual(testMealData.time);
    });
  });

  describe("getAccountMeals", () => {
    it("Returns an array of meals associated with an account", async () => {
      const testMealData = await createTestMeal();
      await createTestMeal({
        accountId: testMealData.accountId,
        id: testMealData.creatorId,
      });
      await createTestMeal();

      const meals = await getAccountMeals(testMealData.accountId);

      expect(meals.length).toEqual(2);

      const testMeal = meals.find((meal) => meal.id === testMealData.id);

      expect(testMeal.accountId).toEqual(testMealData.accountId);
      expect(testMeal.creatorId).toEqual(testMealData.creatorId);
      expect(testMeal.time).toEqual(testMealData.time);
    });
  });

  describe("getMeal", () => {
    it("Returns the meal for given id", async () => {
      const testMealData = await createTestMeal();
      const testMeal = await getMeal(testMealData.id);

      expect(testMeal.accountId).toEqual(testMealData.accountId);
      expect(testMeal.creatorId).toEqual(testMealData.creatorId);
      expect(testMeal.time).toEqual(testMealData.time);
    });
  });

  describe("getUserMeals", () => {
    it("Returns an array of meals created by given user", async () => {
      const testMealData = await createTestMeal();

      await createTestMeal({
        accountId: testMealData.accountId,
        id: testMealData.creatorId,
      });
      await createTestMeal();

      const meals = await getUserMeals(testMealData.creatorId);

      expect(meals.length).toEqual(2);

      const testMeal = meals.find((meal) => meal.id === testMealData.id);

      expect(testMeal.accountId).toEqual(testMealData.accountId);
      expect(testMeal.creatorId).toEqual(testMealData.creatorId);
      expect(testMeal.time).toEqual(testMealData.time);
    });
  });
});
