const db = require("../../data/db-config.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findBy,
};

function find() {
  return db("events")
    .join("locations", "locations.id", "events.location_id")
    .select(
      "events.location_id",
      "events.user_id",
      "events.id",
      "events.title",
      "events.description",
      "events.start_time",
      "events.end_time",
      "locations.business_name",
      "locations.address"
    );
}

function findById(id) {
  return db("events").where("id", id).first();
}

function add(event) {
  return db("events")
    .insert(event)
    .returning("id")
    .then((res) => {
      return findById(res[0]);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

function update(changes, id) {
  return db("events")
    .where("id", id)
    .update(changes)
    .returning("id")
    .then((res) => {
      return findById(res[0]);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

function remove(id) {
  return db("events").where("id", id).del();
}

function findBy(filter) {
  return db("events").where(filter);
}
