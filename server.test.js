const server = require("./server");
const request = require("supertest");
const pg = require("./database");

/**
 *  Truncate the table before each endpoint test and include dummy data
 *  */
beforeEach(async () => {
  await pg.db("village").truncate();
  await pg.addChar({ name: "Goku" });
  await pg.addChar({ name: "Vegeta" });
  await pg.addChar({ name: "Trunks" });
  await pg.addChar({ name: "Cooler" });
});

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
  it("should return a list of characters from the database", done => {
    request(server)
      .get("/api/dbz")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test get specific character endpoint
describe("GET /api/dbz/:id", () => {
  it("respond with json containing a single user", done => {
    request(server)
      .get("/api/dbz/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Testing the endpoint to create a new character should return
// 201 status and inserts character into the database
describe("POST /api/dbz", () => {
  it("should send create a new character and insert it to the database", async () => {
    const data = await request(server)
      .post("/api/dbz")
      .send({ name: "Bulma" });
    expect(data.status).toBe(201);
  });
});

//Test DELETE endpoint /api/dbz/id removes object from the database
describe("DELETE /api/dbz/:id", () => {
  it("should return number of records deleted", done => {
    request(server)
      .delete(`/api/dbz/${4}`)
      .expect(204, done);
  });

  it("length of database should decrease by number of records deleted", async () => {
    const removeChar = await pg.delChar(4);
    const database = await pg.find();
    expect(database.length).toBe(3);
  });
});
