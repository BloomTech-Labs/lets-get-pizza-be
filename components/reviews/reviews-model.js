const query = require("../model.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findBy,
};

const select = [
  "reviews.location_id",
  "reviews.user_id",
  "reviews.id",
  "reviews.rating",
  "reviews.review_title",
  "reviews.review_text",
  "locations.business_name",
  "locations.address",
];

const join = ["locations", "locations.id", "reviews.location_id"];

async function find() {
  return await query.find("reviews");
}

function findById(id) {
  return query.findById("reviews", id);
}

function add(review) {
  return query.add("reviews", review);
}

function update(changes, id) {
  return query.update("reviews", changes, id);
}

function remove(id) {
  return query.remove("reviews", id);
}

function findBy(filter) {
  return query.findBy("reviews", filter, select).join(...join);
}
