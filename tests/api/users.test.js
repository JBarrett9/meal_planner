const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../../app");

describe("/api/users", () => {
  describe("POST /api/users/register", () => {
    it("Creates a new user", async () => {
      const testUserData = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
      };

      const response = await request(app)
        .post("/api/users/register")
        .send(testUserData)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
