const request = require("supertest");
const { Genre } = require("../models/genre");
let server;

describe("/api/genres/:id", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(async () => {
    server = require("../index");
  });

  // closses the server after each test
  afterEach(async () => {
    server.close();
    // cleanup database - remove test data
    // await Genre.remove({});
    await Genre.deleteMany({});
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      // this won't work because of the way mongoose assigns ids
      // expect(res.body).toMatchObject(genre);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id passed", async () => {
      const res = await request(server).get(`/api/genres/${1}`);
      expect(res.status).toBe(404);
    });
  });
});
