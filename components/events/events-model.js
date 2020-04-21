const db = require("../../data/db-config.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findByUserId,
};

function find() {
  return db("events");
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
function findByUserId(user_id) {
  return db("events").where({ user_id });
}
