const server = require('../../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
// our connections to the database
const db = require('../../data/db-config.js');
const Users = require('../../components/users/users-model.js');


//Veryify these are correct (they aren't) and delete this comment, but these should be the only things you really need for these tests
const incomplete_creds = {username: "testuser", email: null, password: "test"}
const good_user_creds = {username: "testuser", email: "testuser10@user.com", password: "test"}
const updated_values = {display_name: "Test User1", favorite_pizza_toppings: "Olives, Mushrooms, Pineapples"}
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
            expect(response.status).toBe(expectedStatusCode);
            //make sure the credentials provided match the returned credentials
        })
        it("Access the dashboard.", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).post('/api/auth/user/login').send(good_user_creds).set("Authorization", user_token);
            expect(response.status).toBe(expectedStatusCode);
        })
      })

      // UNIT TESTING 
      
      describe("Find Users Model", () => {
          beforeEach(async () => {
              await knexCleaner.clean(db)
          })

          it("should return an empty array", async () => {
              const users = await Users.find()

              expect(users).toEqual([])
          })

          it("should return a single user", async () => {
              await Users.add(good_user_creds)
              const users = await Users.find()

              expect(users).toHaveLength(1)
              expect(users[0]).toMatchObject(good_user_creds)
          })
      })

      describe("Find By Id Model", () => {
          beforeEach(async () => {
              await knexCleaner.clean(db)
              await Users.add(good_user_creds)
          })

          it("should return undefined with wrong id", async () => {
              const users = await Users.findById(3)

              expect(users).toBeFalsy()
              expect(users).toBeUndefined()
          })

          it("should return user object with correct id", async () => {
              const user = await Users.findById(1)

              expect(user).toBeDefined()
              expect(user).toBeTruthy()
              expect(user).toMatchObject(good_user_creds)
          })
      })

      describe('Find By Model', () => {
          beforeEach(async () => {
              await knexCleaner.clean(db)
              await Users.add(good_user_creds)
          })

          it('should return with array of users', async () => {
              const users = await Users.findBy({username: 'testuser'})

              expect(users).toHaveLength(1)
          })

          it('should return an empty array with unmatched username', async () => {
              const users = await Users.findBy({username: 'JDawg'})

              expect(users).toHaveLength(0)
          })
      })

      describe("Add Model", () => {
          beforeEach(async () => {
              await knexCleaner.clean(db)
          })
          it("should return an error with incomplete credentials", async () => {
              const failedAdd = await Users.add(incomplete_creds)

              expect(failedAdd).toMatchObject({name: 'error'})
          })

          it("should add user to the database", async () => {
              const successfulAdd = await Users.add(good_user_creds)

              expect(successfulAdd).toMatchObject(good_user_creds)
              expect(successfulAdd).toBeTruthy()
          })
      })

      describe("Update Model", () => {
        beforeEach(async () => {
            await Users.add(good_user_creds)
        })

          it("should return 0 with invalid id", async () => {
              const id = 4
              const updatedUser = await Users.update(updated_values, id)
              const errorMatching = {message: 'Undefined binding(s) detected when compiling FIRST. Undefined column(s): [id] query: select * from "users" where "id" = ? limit ?'}
              expect(updatedUser).toMatchObject(errorMatching)
          })

          it("should update user and return 1", async () => {
              const id = 1
              const matchingObject = {...good_user_creds, ...updated_values}
              const updatedUser = await Users.update(updated_values, id)

              expect(updatedUser).toMatchObject(matchingObject)
          })
      })

      describe("Delete Model", () => {
        beforeEach(async () => {
            await Users.add(good_user_creds)
        })

        it("should return 0 with incorrect id", async () => {
            const id = 2
            const deletedUser = await Users.remove(id)
            const user = await Users.findById(1)

            expect(deletedUser).toBe(0)
            expect(deletedUser).toBeFalsy()
            expect(user).toMatchObject(good_user_creds)
        })

        it("should return 1 with correct id", async () => {
            const id = 1
            const deletedUser = await Users.remove(id)
            const user = await Users.findById(id)

            expect(deletedUser).toBe(1)
            expect(deletedUser).toBeTruthy()
            expect(user).toBeUndefined()
        })
      })
})
