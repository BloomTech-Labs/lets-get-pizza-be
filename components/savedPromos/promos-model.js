const query = require("../model.js");
const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findBy,
};

function find() {
  return query
    .find("savedPromos")
    .join("promotions as p", "p.id", "savedPromos.promo_id");
}

function findById(id) {
  return query.findById("savedPromos", id);
}

function add(promotion) {
  return query.add("savedPromos", promotion);
}

function update(changes, id) {
  return query.update("savedPromos", changes, id);
}

function remove(id) {
  return query.remove("savedPromos", id);
}

function findBy(filter) {
  return query
    .findBy("savedPromos", filter)
    .join("promotions as p", "p.id", "savedPromos.promo_id")
    .join("locations as l", "l.id", "p.location_id")
    .select(
      "p.location_id",
      "p.title",
      "p.text",
      "savedPromos.promo_id",
      "savedPromos.user_id",
      "savedPromos.id",
      "l.business_name",
      "l.address"
    );
}
