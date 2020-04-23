exports.seed = function (knex) {
  return knex("friends").insert([
    { user_id: 1, friends_id: 1, status: "accepted" },
    { user_id: 2, friends_id: 2, status: "accepted" },
    { user_id: 3, friends_id: 3, status: "accepted" },
    { user_id: 3, friends_id: 4, status: "accepted" },
    { user_id: 4, friends_id: 5, status: "accepted" },
    { user_id: 5, friends_id: 6, status: "accepted" },
    { user_id: 5, friends_id: 7, status: "accepted" },
    { user_id: 7, friends_id: 8, status: "accepted" },
    { user_id: 7, friends_id: 9, status: "accepted" },
    { user_id: 7, friends_id: 10, status: "accepted" },
    { user_id: 7, friends_id: 1, status: "accepted" },
    { user_id: 7, friends_id: 2, status: "accepted" },
    { user_id: 8, friends_id: 3, status: "accepted" },
    { user_id: 9, friends_id: 4, status: "accepted" },
    { user_id: 10, friends_id: 5, status: "accepted" },
    { user_id: 1, friends_id: 6, status: "accepted" },
    { user_id: 1, friends_id: 7, status: "accepted" },
  ]);
};
