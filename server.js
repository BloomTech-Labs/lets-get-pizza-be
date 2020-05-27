const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const authenticate = require("./auth/restricted-middleware");
const userauthRouter = require("./auth/userauth-router");
const locationauthRouter = require("./auth/locationauth-router");

const UserRouter = require("./components/users/users-router");
const LocationRouter = require("./components/locations/locations-router");

const ReviewRouter = require("./components/reviews/reviews-router");
const PromotionRouter = require("./components/promotions/promotions-router");
const EventRouter = require("./components/events/events-router");

const FriendsRouter = require("./components/friends/friends-router");

const SavedPromosRouter = require("./components/savedPromos/promos-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//Authorization
server.use("/api/auth/user", userauthRouter);
server.use("/api/auth/location", locationauthRouter);

//Once authorized need to be authenticated and then allowed to use application
server.use("/api/users", authenticate, UserRouter);
server.use("/api/locations", LocationRouter);
server.use("/api/savedPromos", SavedPromosRouter);

//Main components between users/locations
server.use("/api/reviews", ReviewRouter);
server.use("/api/promotions", PromotionRouter);
server.use("/api/events", EventRouter);

//friends table
server.use("/api/friends", FriendsRouter);

//Test message to show that the API server is up and running
server.get("/", (req, res) => {
  res.send("API Connected");
});

module.exports = server;
