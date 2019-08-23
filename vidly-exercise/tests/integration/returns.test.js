const request = require("supertest");
const { User } = require("../../models/user");
const { Movie } = require("../../models/movie");
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");
const moment = require("moment");
let server;

describe("/api/genres/:id", () => {
  let rental;
  let customerId;
  let movieId;
  let token;
  let movie;

  beforeEach(async () => {
    server = require("../../index");

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    movie = new Movie({
      _id: movieId,
      title: "12345",
      dailyRentalRate: 2,
      genre: { name: "12345" },
      numberInStock: 10
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345"
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2
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

  it("should set the return date if the input is valid", async () => {
    result = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    // test that the time set by the endpoint is within 10 seconds of the current time

    // deteReturned is literally not a property of this thing anymore
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should set a rentalFee if input is valid", async () => {
    // toDate makes it a js date object
    rental.dateOut = moment()
      .add(-7, "days")
      .toDate();
    rental.save();

    result = await exec();

    expect(result.body.rentalFee).toBeDefined();
  });

  it("should increase the movie stock if input is valid", async () => {
    const res = await exec();
    let movieInDb = await Movie.findById(movieId);
    console.log(movie.numberInStock);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });
});
