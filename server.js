const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
require("dotenv").config();

const UserRouter = require('./components/users/users-router');
const LocationRouter = require('./components/locations/locations-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', UserRouter);
server.use('/api/locations', LocationRouter);

//Test Server
server.get('/', (req, res) => {
    res.send("API Connected");
});

module.exports = server;