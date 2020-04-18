
exports.seed = function(knex) {
      return knex('friends').insert([
        {user_id: 1, friends_id: 2, status: "accepted"},
        {user_id: 2, friends_id: 3, status: "accepted"},
        {user_id: 3, friends_id: 1, status: "requested"}
      ]);
}
