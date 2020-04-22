exports.seed = function (knex) {
  return knex("friends").insert([
    { id: 1, user_id: 3, friends_id: 2, status: "accepted" },
    { id: 2, user_id: 3, friends_id: 1, status: "accepted" },
    { id: 3, user_id: 2, friends_id: 3, status: "requested" },
  ]);
};
