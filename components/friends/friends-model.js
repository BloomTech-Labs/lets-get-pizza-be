const db = require("../../data/db-config.js");
const query = require('../model.js')

module.exports = {
  getFriends,
  insertFriends,
  removeFriend,
  updateFriend,
  getById,
};

const select = [
  "u.username",
  "u.id",
  "u.display_name",
  "friends.friends_id",
  "friend.username as friend_username"
]

function getFriends() {
  return query.find('friends')
}
///insert to friend table
function insertFriends(friendsData) {
  return query.add('friends', friendsData)
}

function updateFriend(id, updates) {
  return query.update('friends', updates, id)
}

function removeFriend(id) {
  return query.remove('friends', id)
}

function getById(id) {
  return query.findBy('friends', { user_id: id }, select)
    .join("users as u", "u.id", "friends.user_id")
    .join("users as friend", "friend.id", "friends.friends_id")
}
