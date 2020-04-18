exports.up = function (knex) {
  return knex.schema.table("users", (users) => {
    users
      .integer("favorite_pizza_shop", 128)
      .references("id")
      .inTable("locations");
    users.string("bio", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (users) => {
    users.dropColumn("favorite_pizza_shop");
    users.dropColumn("bio");
  });
};
