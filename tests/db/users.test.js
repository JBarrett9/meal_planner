const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const client = require("../../db/client");
const {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
} = require("../../db/users");
const { createTestAccount, createTestUser } = require("../helpers");

describe("DB users", () => {
  describe("createUser", () => {
    it("Creates a user", async () => {
      const account = await createTestAccount();
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        accountId: account.id,
        primaryUser: true,
      };

      const user = await createUser(testUserData);

      expect(user.email).toEqual(testUserData.email);
      expect(user.name).toEqual(testUserData.name);
      expect(user.accountId).toEqual(testUserData.accountId);
      expect(user.primaryUser).toEqual(testUserData.primaryUser);
    });

    it("Does not store plaintext password in the database", async () => {
      const account = await createTestAccount();
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        accountId: account.id,
        primaryUser: true,
      };

      const testUser = await createUser(testUserData);

      const {
        rows: [queriedUser],
      } = await client.query(
        `
        SELECT * from users
        WHERE id = $1;
        `,
        [testUser.id]
      );

      const hashedVersion = await bcrypt.compare(
        testUserData.password,
        queriedUser.password
      );
      expect(hashedVersion).toEqual(true);
    });
  });

  describe("getAllUsers", () => {
    it("Returns an array of user objects", async () => {
      const testUserData = await createTestUser();
      const users = await getAllUsers();

      expect(users).toEqual(expect.any(Array));

      const user = users.find((user) => user.id === testUserData.id);

      expect(user.email).toEqual(testUserData.email);
      expect(user.name).toEqual(testUserData.name);
      expect(user.accountId).toEqual(testUserData.accountId);
      expect(user.primaryUser).toEqual(testUserData.primaryUser);
    });
  });

  describe("getUser", () => {
    it("Returns the user", async () => {
      const account = await createTestAccount();
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        accountId: account.id,
        primaryUser: true,
      };

      await createUser(testUserData);

      const user = await getUser({
        email: testUserData.email,
        password: testUserData.password,
      });

      expect(user.email).toEqual(testUserData.email);
      expect(user.name).toEqual(testUserData.name);
      expect(user.accountId).toEqual(testUserData.accountId);
      expect(user.primaryUser).toEqual(testUserData.primaryUser);
    });

    it("Does not return password", async () => {
      const account = await createTestAccount();
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        accountId: account.id,
        primaryUser: true,
      };

      await createUser(testUserData);

      const user = await getUser({
        email: testUserData.email,
        password: testUserData.password,
      });

      expect(user.password).toBeFalsy();
    });
  });

  describe("getUserById", () => {
    it("Gets user by id", async () => {
      const testUserData = await createTestUser();
      const user = await getUserById(testUserData.id);

      expect(user.email).toEqual(testUserData.email);
      expect(user.name).toEqual(testUserData.name);
      expect(user.accountId).toEqual(testUserData.accountId);
      expect(user.primaryUser).toEqual(testUserData.primaryUser);
      expect(user.password).toBeFalsy();
    });
  });

  describe("updateUser", () => {
    it("Updates given fields leaving others unchanged", async () => {
      const testUser = await createTestUser();
      const updateFields = {
        id: testUser.id,
        password: faker.internet.password(),
        admin: true,
      };

      updateUser(updateFields);

      const {
        rows: [queriedUser],
      } = await client.query(
        `
        SELECT * from users
        WHERE id = $1;
        `,
        [testUser.id]
      );

      expect(queriedUser.email).toEqual(testUser.email);
      expect(queriedUser.name).toEqual(testUser.name);
      expect(queriedUser.accountId).toEqual(testUser.accountId);
      expect(queriedUser.primaryUser).toEqual(testUser.primaryUser);
      expect(queriedUser.admin).toEqual(updateFields.admin);
      expect(queriedUser.password).toEqual(updateFields.password);
    });

    it("Returns the updated user object, excluding password", async () => {
      const testUser = await createTestUser();
      const updateFields = {
        id: testUser.id,
        email: faker.internet.email(),
      };

      const updatedUser = await updateUser(updateFields);

      expect(updatedUser.email).toEqual(updateFields.email);
      expect(updatedUser.name).toEqual(testUser.name);
      expect(updatedUser.accountId).toEqual(testUser.accountId);
      expect(updatedUser.primaryUser).toEqual(testUser.primaryUser);
      expect(updatedUser.admin).toEqual(testUser.admin);
      expect(updatedUser.password).toBeFalsy();
    });
  });
});
