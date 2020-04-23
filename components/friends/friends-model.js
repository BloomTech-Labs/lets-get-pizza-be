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
function insertFriends(friendsData) {
  return db("friends").insert(friendsData)
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
