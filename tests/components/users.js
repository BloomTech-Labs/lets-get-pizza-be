const server = require('../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
// our connection to the database
const db = require('../data/dbConfig.js');
// the data access file we are testing
const Users = require('../../components/users/user-model.js');
//Remove the test database.


//Veryify these are correct (they aren't) and delete this comment, but these should be the only things you really need for these tests
const incomplete_creds = {username: "testuser", user_email: null, password: "test"}
const good_user_creds = {username: "testuser", user_email: "testuser@user.com", password: "test"}

// CHEAT SHEAT
// const response = await request(server).post('/api/users/auth/login').send(good_user_creds).set("Authorization", user_token);
// const response = await request(server).get('/api/users/dashboard').set("Authorization", user_token)

describe("User Tests",  () => {
    it("Finding user tests", async () => {
      await knexCleaner.clean(db)
      expect(1).toBe(1);
    })

    describe("Register endpoint", () => {
        it("Register with incomplete credentials", async () => {
            const expectedStatusCode = 500;
            //
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Register normal user", async () => {
            const expectedStatusCode = 201;
            //
            expect(response.status).toBe(expectedStatusCode);
            //make sure the credentials provided match the returned credentials
        })
        it("Register with exact same credentials, expecting failure", async () => {
            const expectedStatusCode = 500;
            //
            expect(response.status).toBe(expectedStatusCode);
        })
      })

      describe("Logging in", () => {
        it("Try logging in", async () => {
            const expectedStatusCode = 200;
            //
            expect(response.status).toBe(expectedStatusCode);
            //make sure the credentials provided match the returned credentials
        })
        it("Access the dashboard.", async () => {
            const expectedStatusCode = 200;
            //
            expect(response.status).toBe(expectedStatusCode);
        })
      })
})
