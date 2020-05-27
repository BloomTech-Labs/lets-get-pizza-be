exports.up = function (knex) {
  return knex.schema.table("savedPromos", (promos) => {
    promos.increments("user_promo_id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("savedPromos", (promos) => {
    promos.dropColumn("user_promo_id");
  });
};
