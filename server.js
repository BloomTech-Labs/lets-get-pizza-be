const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
require("dotenv").config();

const authenticate = require("./auth/restricted-middleware");
const authRouter = require("./auth/auth-router");
const UserRouter = require('./components/users/users-router');
const LocationRouter = require('./components/locations/locations-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//Routes

//Authorization
server.use("/api/auth", authRouter);
//Once authorized need to be authenticated and then allowed to use application
server.use("/api/users", authenticate, UserRouter);
server.use('/api/locations', LocationRouter);

//Test Server
server.get('/', (req, res) => {
    res.send("API Connected");
});

module.exports = server;