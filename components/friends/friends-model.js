const query = require('../model.js')

module.exports = {
  getFriends,
  insertFriends,
  removeFriend,
  updateFriend,
  getById,
  getByUserId
};

const select = [
  "friends.id",
  "u.username",
  "u.display_name",
  "friends.friends_id",
  "friend.username as friend_username",
  "friend.display_name as friend_display_name",
  "friend.display_location as friend_location",
  "friend.profile_image as friend_profile_image",
  "friend.bio as friend_bio",
  "friend.favorite_pizza_shop as friend_favorite_pizza_shop"

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

function getByUserId(id) {
  return query.findBy('friends', {user_id: id}, select,)
    .join("users as u", "u.id", "friends.user_id")
    .join("users as friend", "friend.id", "friends.friends_id")
}

function getById(id){
  return query.findById('friends', id)
}