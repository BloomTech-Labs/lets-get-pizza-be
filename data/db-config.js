require("dotenv").config();
const knex = require("knex");
const dbEnvironment = process.env.NODE_ENVT || "development";
const knexConfig = require("../knexfile")[dbEnvironment];
module.exports = knex(knexConfig);
