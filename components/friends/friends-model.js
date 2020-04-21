const db = require("../../data/db-config.js");

module.exports = {
  getFriends,
  insertFriends,
  removeFriend,
  updateFriend,
  getById,
};

function getFriends() {
  return db("friends");
}
///insert to friend table
function insertFriends(users_id, friends_id) {
  return db("friends").insert({ users_id, friends_id });
}

function updateFriend(id, updates) {
  return db("friends").where({ id }).update(updates);
}

function removeFriend(id) {
  return db("friends").where("id", id).del();
}

function getById(id) {
  return db("friends").where({ id }).first();
}
