const request = require("supertest");
const { Genre } = require("../models/genre");
let server;

describe("/api/genres", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(() => {
    server = require("../index");
  });

  // closses the server after each test
  afterEach(async () => {
    server.close();
    // cleanup database - remove test data
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      // validation in Genre will still take place so use legit values
      Genre.collection.insertMany([{ name: "genre1" }, { name: "genre2" }]);

      // this is provided by supertest - it sends a http request like postman, rest http
      const res = await request(server).get("/api/genres");
      // these two tests are general
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      // this test is specific
      //
      // checks that the first element has name 'genre1' - which returns true which is checked by jest
      expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
    });
  });
});
