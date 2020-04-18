exports.up = function (knex) {
  return knex.schema.table("users", (users) => {
    users.string("favorite_pizza_shop", 128);
    users.string("bio", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn("favorite_pizza_shop").dropColumn("bio");
};
