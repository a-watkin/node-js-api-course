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

  // closes the server after each test
  afterEach(async () => {
    await server.close();
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

  // closes the server after each test
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

describe("PUT /", () => {
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

  // tests that use this still themselves need to be async this returns a promise
  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        name
      });
  };

  it("should return a 200 along with the posted genre", async () => {
    // post a genre
    const res = await exec();
    // get that genres id
    const id = res.body._id;
    // use that id to update genre1 to genre2
    const updateRes = await request(server)
      .put(`/api/genres/${id}`)
      .set("X-Auth-Token", token)
      .send({
        name: "genre2"
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty("_id");
    expect(updateRes.body).toHaveProperty("name", "genre2");
  });

  // passing an id that is wrong

  it("should return a 404 if the genre is not found", async () => {
    // post a genre
    const res = await exec();
    // get that genres id
    const id = mongoose.Types.ObjectId();
    // use that id to update genre1 to genre2
    const updateRes = await request(server)
      .put(`/api/genres/${id}`)
      .set("X-Auth-Token", token)
      .send({
        name: "genre2"
      });

    expect(updateRes.status).toBe(404);
  });

  it("should return a 400 status if the genre name is not at least 5 characters long", async () => {
    // post a genre
    const res = await exec();
    // get that genres id
    const id = res.body._id;
    // use that id to update genre1 to genre2
    const updateRes = await request(server)
      .put(`/api/genres/${id}`)
      .set("X-Auth-Token", token)
      .send({
        name: new Array(3).join("a")
      });

    expect(updateRes.status).toBe(400);
  });
});

describe("DELETE /", () => {
  /* A big problem with the tests i wrote is that i'm posting then deleting, but actually i should just be putting the stuff in the db then deleting via the api. */

  let token;
  let id;

  beforeEach(async () => {
    // starts a new server for each test
    // if you already had a server running it would cause a conflict to import server
    server = require("../../index");
    genre = new Genre({ name: "genre1" });
    genre.save();
    id = genre._id;
    token = new User({ isAdmin: true }).generateAuthToken();
  });

  afterEach(async () => {
    // closses the server after each test
    server.close();
    // cleanup database - remove test data
    await Genre.deleteMany({});
  });

  // tests that use this still themselves need to be async this returns a promise
  const exec = async () => {
    // deletes the genre that was saved above via the API
    return await request(server)
      .delete("/api/genres/" + id)
      .set("X-Auth-Token", token);
  };

  // i didn't think to do this one
  it("should return the removed genre", async () => {
    const res = await exec();

    expect(res.body).toHaveProperty("_id", genre._id.toHexString());
    expect(res.body).toHaveProperty("name", genre.name);
  });

  it("should delete the genre if input is valid", async () => {
    const res = await exec();
    // console.log(res.body);
    // // get that genres id
    // const id = res.body._id;
    // // use that id to update genre1 to genre2
    // const deletedRes = await request(server)
    //   .delete(`/api/genres/${id}`)
    //   .set("X-Auth-Token", token);

    // instead of the above just check the db doesn't contain the genre
    const genreInDb = await Genre.findById(id);

    expect(genreInDb).toBeNull();

    // expect(deletedRes.status).toBe(200);
    // expect(deletedRes.body).toHaveProperty("_id");
    // expect(deletedRes.body).toHaveProperty("name", "genre1");
  });

  it("should return 404 if genre id is not valid", async () => {
    // get that genres id
    id = mongoose.Types.ObjectId();
    const res = await exec();
    // use that id to update genre1 to genre2
    // const deletedRes = await request(server)
    //   .delete(`/api/genres/${id}`)
    //   .set("X-Auth-Token", token);

    expect(res.status).toBe(404);
  });

  it("should return 404 if the given genre id is not found", async () => {
    id = mongoose.Types.ObjectId();
    const res = await exec();
    // use that id to update genre1 to genre2
    // const deletedRes = await request(server)
    //   .delete(`/api/genres/${id}`)
    //   .set("X-Auth-Token", token);

    expect(res.status).toBe(404);
  });

  // I had this as 403 but is should be 401
  // should be 403 when user is not admin
  it("should return a 403 if user is not admin", async () => {
    // getting a token for a user that is not an admin
    token = new User({ isAdmin: false }).generateAuthToken();
    // post a genre
    const res = await exec();
    // console.log(res.body);
    // get that genres id
    // const id = res.body._id;
    // use that id to update genre1 to genre2
    // const deletedRes = await request(server)
    //   .delete(`/api/genres/${id}`)
    //   .set("X-Auth-Token", token);

    expect(res.status).toBe(403);
  });
});
