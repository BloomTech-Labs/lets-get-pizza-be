exports.up = function (knex) {
  return knex.schema.createTable("savedPromos", (promos) => {
    promos
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    promos
      .integer("promo_id")
      .references("id")
      .inTable("promotions")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("savedPromos");
};
