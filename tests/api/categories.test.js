const request = require("supertest");
const { createTestCategory } = require("../helpers");

describe("/api/categories", () => {
  describe("GET /api/categories/query", () => {
    it("Returns a list of categories", async () => {
      const testCategoryData = await createTestCategory();
      const response = await request(app).get("/api/categories/query");
    });
  });

  describe("GET /api/categories/category/:categoryId", () => {});

  describe("POST /api/categories", () => {});
});
