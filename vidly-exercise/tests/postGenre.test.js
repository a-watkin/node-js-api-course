const request = require("supertest");
const { Genre } = require("../models/genre");
const { User } = require("../models/user");
let server;

/* how to refactor

define a happy path, then in each test change one parameter that clearly aligns with the name of the test

*/

describe("POST /", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(async () => {
    server = require("../index");
    token = new User().generateAuthToken();
    name = "genre1";
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
  let genre;

  // tests that use this still themselves need to be async this returns a promise
  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        name
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
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return a 400 if genre is less than 5 characters", async () => {
    name = "1234";
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return a 400 if genre is more than 50 characters", async () => {
    // gives an array of 52 elements with a between
    // the elements are actually empty items
    name = new Array(52).join("a");
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return a 200 along with the posted genre", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    const genre = await Genre.find({ name });
    expect(genre).not.toBeNull();
  });
});
