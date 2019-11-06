const server = require('../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
// our connection to the database
const db = require('../data/dbConfig.js');
// the data access file we are testing
const Users = require('../components/users/user-model.js');
//Remove the test database.



require('./components/locations.js')
require('./components/users.js')
