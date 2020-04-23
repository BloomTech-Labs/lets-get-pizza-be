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
  return db("friends")
    .join("users as u", "u.id", "friends.user_id")
    .join("users as friend", "friend.id", "friends.friends_id")
    .select(
      "u.username",
      "u.id",
      "u.display_name",
      "friends.friends_id",
      "friend.username as friend_username"
    )
    .where({ user_id: id });
}
