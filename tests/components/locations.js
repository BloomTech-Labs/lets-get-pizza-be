const server = require('../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
// our connection to the database
const db = require('../data/dbConfig.js');
// the data access file we are testing
const Locations = require('../../components/locations/location-model.js');
//Remove the test database.


const incomplete_creds = {locationname: "testlocation", location_email: null, password: "test"}
const good_location_creds = {locationname: "testlocation", location_email: "testlocation@location.com", password: "test"}

// CHEAT SHEAT
// const response = await request(server).post('/api/locations/auth/login').send(good_location_creds).set("Authorization", location_token);
// const response = await request(server).get('/api/locations/dashboard').set("Authorization", location_token)

describe("Location Tests",  () => {
    it("Finding location tests", async () => {
      await knexCleaner.clean(db)
      expect(1).toBe(1);
    })

    // describe("Register endpoint", () => {
    //     it("Register with incomplete credentials", async () => {
    //         const expectedStatusCode = 500;
    //         //
    //         expect(response.status).toBe(expectedStatusCode);
    //     })
    //     it("Register normal location", async () => {
    //         const expectedStatusCode = 201;
    //         //
    //         expect(response.status).toBe(expectedStatusCode);
    //         //make sure the credentials provided match the returned credentials
    //     })
    //     it("Register with exact same credentials, expecting failure", async () => {
    //         const expectedStatusCode = 500;
    //         //
    //         expect(response.status).toBe(expectedStatusCode);
    //     })
    //   })
    //
    //   describe("Logging in", () => {
    //     it("Try logging in", async () => {
    //         const expectedStatusCode = 200;
    //         //
    //         expect(response.status).toBe(expectedStatusCode);
    //         //make sure the credentials provided match the returned credentials
    //     })
    //     it("Access the dashboard.", async () => {
    //         const expectedStatusCode = 200;
    //         //
    //         expect(response.status).toBe(expectedStatusCode);
    //     })
    //   })
})
