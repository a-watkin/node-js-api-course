const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;

describe("/api/genres/:id", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(async () => {
    server = require("../../index");
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

    it("should return 404 if no genre with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);
      expect(res.status).toBe(404);
    });
  });
});

describe("/api/genres", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(() => {
    server = require("../../index");
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

/* how to refactor

define a happy path, then in each test change one parameter that clearly aligns with the name of the test

*/

describe("POST /", () => {
  // starts a new server for each test
  // if you already had a server running it would cause a conflict to import server
  beforeEach(async () => {
    server = require("../../index");
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
