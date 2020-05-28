exports.up = function (knex) {
  return knex.schema.table("savedPromos", (promos) => {
    promos.increments();
  });
};

exports.down = function (knex) {
  return knex.schema.table("savedPromos", (promos) => {
    promos.dropColumn("id");
  });
};
