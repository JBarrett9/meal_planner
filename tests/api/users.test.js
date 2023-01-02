const request = require("supertest");

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
        .send(testUserData);
    });
  });
});