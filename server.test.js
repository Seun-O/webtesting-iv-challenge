const server = require("./server");
const request = require("supertest");
const pg = require("./database");

// Test Endpoint / should return status 200
// Test to see if the Server is up and running
describe("GET /", () => {
  it("should return status 200", async () => {
    const data = await request(server).get("/");
    expect(data.status).toBe(200);
    expect(data.type).toBe("application/json");
  });
});

//Test the get endpoint to see if it returns a list of character arrays
describe("GET /api/dbz", () => {
  it("should return a list of characters from the database", async () => {
    const data = await request(server).get("/api/dbz");
    const expected = await pg.find();
    expect(data.body).toEqual(expected);
  });
});
