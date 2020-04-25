const server = require("../../server.js");
const request = require("supertest");
var knexCleaner = require("knex-cleaner");
const jwt = require("jsonwebtoken");
const secret = require("../../secrets");
// our connections to the database
const db = require("../../data/db-config.js");

const incomplete_creds = { user_id: "testuser", friends_id: null };
const user_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM2MDM0OTgsImV4cCI6MTU3MzY4OTg5OH0.4l-aNKbd1Ri3aYoUTvNmotUZzRLiGve8p4gA-W7rS3Q";

// let token;

// beforeAll((done) => {
//   request(server)
//     .post("api/auth/user/login")
//     .send({
//       username: "Billy",
//       password: "billy123",
//     })
//     .then((res) => {
//       console.log(res);
//       token = res.body.token;
//       done();
//     });
// .end((err, response) => {
//   console.log(response);
//   token = response.body.token; // save the token!
//   done();
// });
// });

it("should return 200", async () => {
  //   const Token = await jwt.verify(token, secret.jwtSecret);
  const users = await request(server).get("/api/friends");
  // .set("Authorization", user_token);
  expect(users.status).toBe(200);
});

describe("friends tests", () => {
  it("cleans", async () => {
    await knexCleaner.clean(db);
    expect(1).toBe(1);
  });

  it("returns 500 with bad credentials", async () => {
    const expectedCode = 500;
    const response = await request(server)
      .post("/api/friends")
      .send(incomplete_creds)
      .set("Authorization", user_token);
    expect(response.status).toBe(expectedCode);
  });
});
