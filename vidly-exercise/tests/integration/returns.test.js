const request = require("supertest");
const { User } = require("../../models/user");
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");
let server;

describe("/api/genres/:id", () => {
  let rental;
  let customerId;
  let movieId;
  let token;

  beforeEach(async () => {
    server = require("../../index");

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345"
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2.5
      }
    });

    rental = await rental.save();
    token = new User({ isAdmin: true }).generateAuthToken();

    // console.log("where the fuck is this! ", rental);
  });

  // closses the server after each test
  afterEach(async () => {
    await server.close();
    await rental.remove({});
  });

  const exec = async () => {
    return await request(server)
      .post("/api/returns")
      .set("X-Auth-Token", token)
      .send({
        customerId,
        movieId
      });
  };

  it("should return 400 if customerId is not provided", async () => {
    customerId = "";
    result = await exec();
    expect(result.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    result = await exec();
    expect(result.status).toBe(400);
  });

  it("should return 401 if the client is not logged in", async () => {
    token = "";
    result = await exec();
    expect(result.status).toBe(401);
  });

  it("should return 404 if a rental is not found", async () => {
    await rental.remove({});
    result = await exec();
    expect(result.status).toBe(404);
  });

  it("should return 400 if rental has already been returned", async () => {
    rental.dateReturned = Date.now();
    await rental.save();
    result = await exec();
    expect(result.status).toBe(400);
  });

  it("should return 200 if the rental is accepted", async () => {
    result = await exec();
    expect(result.status).toBe(200);
  });
});
