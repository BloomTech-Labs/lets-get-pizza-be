const server = require('../../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
// our connections to the database
const db = require('../../data/db-config.js');
const Locations = require('../../components/locations/locations-model.js');


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

      describe("/maps", () => {
        it("The default route call with no search parameters", async () => {
            const expectedStatusCode = 201;
            const response = await request(server).post('/api/locations').send(good_location_creds);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with a latitude & longitude field, and either a foursquare_id or location_id
        })
        it("The route call with a search equal to a city name", async () => {
            const expectedStatusCode = 201;
            const location_token = 'https://plza.herokuapp.com/api/locations/map?search=Cleveland'
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with a latitude & longitude field, and either a foursquare_id or location_id
        })
        it("The default route call with a search equal to a zip code", async () => {
            const expectedStatusCode = 201;
            const location_token = 'https://plza.herokuapp.com/api/locations/map?search=44039'
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with a latitude & longitude field, and either a foursquare_id or location_id
        })
        it("The default route call with a search equal to an address", async () => {
            const expectedStatusCode = 201;
            const location_token = 'https://plza.herokuapp.com/api/locations/map?search=6000+Jaycox+Rd,North+Ridgveille,Oh,44039'
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with a latitude & longitude field, and either a foursquare_id or location_id
        })
      })



      describe("/list", () => {
        it("The default route call with no search parameters", async () => {
            const expectedStatusCode = 201;
            const location_token = ''
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with an address field and either a foursquare_id or location_id
        })
        it("The route call with a search equal to a city name", async () => {
            const expectedStatusCode = 201;
            const location_token = 'https://plza.herokuapp.com/api/locations/list?search=Cleveland'
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with an address field and either a foursquare_id or location_id
        })
        it("The default route call with a search equal to a zip code", async () => {
            const expectedStatusCode = 201;
            const location_token = 'https://plza.herokuapp.com/api/locations/list?search=44039'
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify (on some level) that an array of objects is returned
        })
        it("The default route call with a search equal to an address", async () => {
            const expectedStatusCode = 201;
            const location_token = 'https://plza.herokuapp.com/api/locations/list?search=6000+Jaycox+Rd,North+Ridgveille,Oh,44039'
            const response = await request(server).post('/api/locations/').send(good_location_creds).set("Authorization", location_token);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify (on some level) that an array of objects is returned
        })
      })

      describe("/live/:foursquare_id", () => {
        it("Test the route with a basic call", async () => {
            const expectedStatusCode = 201;
            const response = await request(server).post('/api/locations/').send(good_location_creds);
            expect(response.status).toBe(expectedStatusCode);
            //Verify that the locations are returned
            //Verify that an array of objects is returned with an address field and either a foursquare_id or location_id

            //Save the first list item & it's foursquare_id in the list into variables
            const foursquareResultItem = null;
            const foursquareId = null;

            //Make our api call to /live/id, and save that in a variable
            const liveRouteResult = null; // await request(server).......

            //Check that the two are equal
        })
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
