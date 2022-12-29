const { createInventory, getInventory } = require("../../db/inventories");
const { createTestUser } = require("../helpers");

describe("DB inventories", () => {
  describe("createInventory", () => {
    it("Creates an inventory and returns an inventory object", async () => {
      const testUser = await createTestUser();
      const testInventory = await createInventory(testUser.accountId);

      expect(typeof testInventory.id).toEqual("number");
      expect(testInventory.accountId).toEqual(testUser.accountId);
    });
  });

  describe("getInventory", () => {
    it("Returns inventory", async () => {
      const testUser = await createTestUser();
      const testInventoryData = await createInventory(testUser.accountId);
      const testInventory = await getInventory(testInventoryData.id);

      expect(testInventory.id).toEqual(testInventoryData.id);
      expect(testInventory.accountId).toEqual(testInventoryData.accountId);
    });
  });
});
