const db = require("../../data/db-config.js");

module.exports = {
  getFriends,
  insertFriends,
  removeFriend,
  updateFriend,
  getById,
};

function getFriends() {
  return db("friends")
    .join("users as u", "u.id", "friends.user_id")
    .join("users as friend", "friend.id", "friends.friends_id")
    .select(
      "u.username",
      "u.id",
      "u.display_name",
      "friends.friends_id",
      "friend.username as friend_username",
      "u.profile_image as user_image",
      "friend.profile_image as friend_image",
      "friend.bio"
    );
}
///insert to friend table
function insertFriends(friendsData) {
  return db("friends").insert(friendsData);
}

function updateFriend(id, updates) {
  return db("friends").where("id", id).update(updates);
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
      "friend.username as friend_username",
      "u.profile_image",
      "friend.profile_image as friend_image",
      "friend.bio"
    )
    .where({ user_id: id });
}
