const request = require("supertest");
const { Genre } = require("../models/genre");
const { User } = require("../models/user");
let server;

describe("POST /", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(async () => {
    server = require("../index");
    token = new User().generateAuthToken();
  });

  // closses the server after each test
  afterEach(async () => {
    server.close();
    // cleanup database - remove test data
    // await Genre.remove({});
    await Genre.deleteMany({});
  });

  // here to allow setting it to an empty string for testing not being logged in
  let token;

  // tests that use this still themselves need to be async this returns a promise
  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        // gives an array of 52 elements with a between
        // the elements are actually empty items
        name: "genre1"
      });
  };

  // the happy path
  it("should return a 200 along with the posted genre", async () => {
    const res = await exec();
    // it doesn't matter what the value of _id is here just that it exists
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "genre1");
  });

  it("should return a 401 if client not logged in", async () => {
    const res = await request(server)
      .post("/api/genres")
      .send({
        name: "genre1"
      });

    expect(res.status).toBe(401);
  });

  it("should return a 400 if genre is less than 5 characters", async () => {
    const token = new User().generateAuthToken();

    const res = await request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        name: "1234"
      });

    expect(res.status).toBe(400);
  });

  it("should return a 400 if genre is more than 50 characters", async () => {
    const token = new User().generateAuthToken();

    const res = await request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        // gives an array of 52 elements with a between
        // the elements are actually empty items
        name: new Array(52).join("a")
      });

    expect(res.status).toBe(400);
  });

  it("should return a 200 along with the posted genre", async () => {
    const token = new User().generateAuthToken();

    const res = await request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        // gives an array of 52 elements with a between
        // the elements are actually empty items
        name: "comedy"
      });

    expect(res.status).toBe(200);

    const genre = await Genre.find({ name: "Comedy" });
    expect(genre).not.toBeNull();
  });
});
