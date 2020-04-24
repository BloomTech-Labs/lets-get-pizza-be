exports.up = function (knex) {
  return knex.schema.createTable("friends", (friends) => {
    friends.integer("user_id").notNullable().references("id").inTable("users");
    friends
      .integer("friends_id")
      .notNullable()
      .references("id")
      .inTable("users");
    //three friend status options: requested, accepted, blocked
    friends.string("status").defaultTo("requested");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("friends");
};


