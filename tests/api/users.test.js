const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../../app");
const { createAccount } = require("../../db/accounts");
const { createTestAccount } = require("../helpers");
const { createUser } = require("../../db/users");

describe("/api/users", () => {
  describe("POST /api/users/login", () => {
    it("", async () => {
      const account = await createTestAccount();
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        accountId: account.id,
        primaryUser: true,
      };

      const testUser = await createUser(testUserData);

      const response = await request(app)
        .post("/api/users/login")
        .send({ email: testUserData.email, password: testUserData.password });

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(typeof response.body.token).toEqual("string");
      expect(response.body.user.email).toEqual(testUserData.email);
      expect(response.body.user.name).toEqual(testUserData.name);
      expect(response.body.user.admin).toEqual(false);
      expect(response.body.user.primaryUser).toEqual(true);
      expect(typeof response.body.user.accountId).toEqual("number");
      expect(typeof response.body.user.id).toEqual("number");
      expect(response.body.user.password).toBeFalsy();
    });
  });

  describe("POST /api/users/register", () => {
    it("Creates a new user", async () => {
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
      };

      const response = await request(app)
        .post("/api/users/register")
        .send(testUserData);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(typeof response.body.token).toEqual("string");
      expect(response.body.user.email).toEqual(testUserData.email);
      expect(response.body.user.name).toEqual(testUserData.name);
      expect(response.body.user.admin).toEqual(false);
      expect(response.body.user.primaryUser).toEqual(true);
      expect(typeof response.body.user.accountId).toEqual("number");
      expect(typeof response.body.user.id).toEqual("number");
      expect(response.body.user.password).toBeFalsy();
    });

    it("Adds user to an account if accountId provided", async () => {
      const account = await createAccount("Test account");
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        accountId: account.id,
      };

      const response = await request(app)
        .post("/api/users/register")
        .send(testUserData);

      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(typeof response.body.token).toEqual("string");
      expect(response.body.user.email).toEqual(testUserData.email);
      expect(response.body.user.name).toEqual(testUserData.name);
      expect(response.body.user.admin).toEqual(false);
      expect(response.body.user.primaryUser).toEqual(false);
      expect(response.body.user.accountId).toEqual(testUserData.accountId);
      expect(typeof response.body.user.id).toEqual("number");
      expect(response.body.user.password).toBeFalsy();
    });
  });
});
