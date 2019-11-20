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
