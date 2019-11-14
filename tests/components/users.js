const server = require('../../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
// our connections to the database
const db = require('../../data/db-config.js');
const Users = require('../../components/users/users-model.js');


//Veryify these are correct (they aren't) and delete this comment, but these should be the only things you really need for these tests
const incomplete_creds = {username: "testuser", email: null, password: "test"}
const good_user_creds = {username: "testuser", email: "testuser10@user.com", password: "test"}
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM2MDM0OTgsImV4cCI6MTU3MzY4OTg5OH0.4l-aNKbd1Ri3aYoUTvNmotUZzRLiGve8p4gA-W7rS3Q';
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
            const response = await request(server).post('/api/auth/user/register').send(incomplete_creds);
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Register normal user", async () => {
            const expectedStatusCode = 201;
            const response = await request(server).post('/api/auth/user/register').send(good_user_creds); 
            expect(response.status).toBe(expectedStatusCode);
            //make sure the credentials provided match the returned credentials
        })
        it("Register with exact same credentials, expecting failure", async () => {
            const expectedStatusCode = 500;
            const response = await request(server).post('/api/auth/user/register').send(good_user_creds); 
            expect(response.status).toBe(expectedStatusCode);
        })
      })

      describe("Logging in", () => {
        it("Try logging in", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).post('/api/auth/user/login').send(good_user_creds).set("Authorization", user_token);
            console.log(response.error)
            expect(response.status).toBe(expectedStatusCode);
            //make sure the credentials provided match the returned credentials
        })
        it("Access the dashboard.", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).post('/api/auth/user/login').send(good_user_creds).set("Authorization", user_token);
            expect(response.status).toBe(expectedStatusCode);
        })
      })
})
