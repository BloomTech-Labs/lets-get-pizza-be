exports.up = function (knex) {
  return knex.schema.table("friends", (friends) => {
    friends.increments();
  });
};

exports.down = function (knex) {
  return knex.schema.table("friends", (friends) => {
    friends.dropColumn("id");
  });
};
