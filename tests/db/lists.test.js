const { faker } = require("@faker-js/faker");
const {
  createList,
  getList,
  getListsByAccountId,
  getListsByUserId,
  getAccountActiveLists,
} = require("../../db/lists");
const { createTestUser, createTestList } = require("../helpers");

describe("DB lists", () => {
  describe("createList", () => {
    it("Creates a list", async () => {
      const testUser = await createTestUser();
      const testListData = {
        active: true,
        accountId: testUser.accountId,
        userId: testUser.id,
        created: faker.date.future(1),
      };

      const testList = await createList(testListData);

      expect(typeof testList.id).toEqual("number");
      expect(testList.active).toEqual(testListData.active);
      expect(testList.accountId).toEqual(testListData.accountId);
      expect(testList.creatorId).toEqual(testListData.userId);
    });
  });

  describe("getList", () => {
    it("Returns the list for given id", async () => {
      const testListData = await createTestList();
      const testList = await getList(testListData.id);

      expect(testList.id).toEqual(testListData.id);
      expect(testList.active).toEqual(testListData.active);
      expect(testList.accountId).toEqual(testListData.accountId);
      expect(testList.creatorId).toEqual(testListData.creatorId);
    });
  });

  describe("getListsByAccountId", () => {
    it("Returns an array of lists associated with an account", async () => {
      const testListData = await createTestList();
      await createTestList({
        accountId: testListData.accountId,
        id: testListData.creatorId,
      });
      await createTestList();

      const lists = await getListsByAccountId(testListData.accountId);

      expect(lists.length).toEqual(2);

      const testList = lists.find((list) => list.id === testListData.id);

      expect(testList.active).toEqual(testListData.active);
      expect(testList.accountId).toEqual(testListData.accountId);
      expect(testList.creatorId).toEqual(testListData.creatorId);
    });
  });

  describe("getListsByUserId", () => {
    it("Returns an array of lists associated with given user", async () => {
      const testListData = await createTestList();
      await createTestList({
        accountId: testListData.accountId,
        id: testListData.creatorId,
      });
      await createTestList();

      const lists = await getListsByUserId(testListData.creatorId);

      expect(lists.length).toEqual(2);

      const testList = lists.find((list) => list.id === testListData.id);

      expect(testList.active).toEqual(testListData.active);
      expect(testList.accountId).toEqual(testListData.accountId);
      expect(testList.creatorId).toEqual(testListData.creatorId);
    });
  });

  describe("getAccountActiveLists", () => {
    it("Returns an array of active lists associated with given user", async () => {
      const testListData = await createTestList();
      await createTestList({
        accountId: testListData.accountId,
        id: testListData.creatorId,
      });
      await createList({
        active: false,
        accountId: testListData.accountId,
        userId: testListData.creatorId,
        created: faker.date.future(1),
      });

      const lists = await getAccountActiveLists(testListData.accountId);

      expect(lists.length).toEqual(2);

      const testList = lists.find((list) => list.id === testListData.id);

      expect(testList.active).toEqual(testListData.active);
      expect(testList.accountId).toEqual(testListData.accountId);
      expect(testList.creatorId).toEqual(testListData.creatorId);
    });
  });
});
