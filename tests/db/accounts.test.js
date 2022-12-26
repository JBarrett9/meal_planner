const { createAccount } = require("../../db/accounts");

describe("DB accounts", () => {
  describe("createAccount", () => {
    it("Creates an account with given name", async () => {
      const name = "Test Account One";

      const account = await createAccount(name);

      expect(account.name).toEqual(name);
    });
  });
});
