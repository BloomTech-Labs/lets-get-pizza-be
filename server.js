const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
require("dotenv").config();

const authenticate = require("./auth/restricted-middleware");
const userauthRouter = require("./auth/userauth-router");
const locationauthRouter = require("./auth/locationauth-router");

const UserRouter = require('./components/users/users-router');
const LocationRouter = require('./components/locations/locations-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// Add headers
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Authorization
server.use("/api/auth/user", userauthRouter);
server.use("/api/auth/location", locationauthRouter);

//Once authorized need to be authenticated and then allowed to use application
server.use("/api/users", authenticate, UserRouter);
server.use('/api/locations', LocationRouter);

//Test Server
server.get('/', (req, res) => {
    res.send("API Connected");
});

module.exports = server;
