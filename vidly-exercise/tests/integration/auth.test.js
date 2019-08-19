const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("authorization middleware", () => {
  let token;

  beforeEach(async () => {
    server = require("../../index");
    token = new User().generateAuthToken();
  });

  // closses the server after each test
  afterEach(async () => {
    await server.close();
  });

  // happy path
  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("X-Auth-Token", token)
      .send({
        name: "genre1"
      });
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
