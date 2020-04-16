exports.up = function (knex) {
  return knex.schema.createTable("promotions", (promotions) => {
    promotions.increments();
    //location_id
    promotions
      .integer("location_id")
      .notNullable()
      .references("id")
      .inTable("locations")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    //title
    promotions.string("title", 128).notNullable();
    //text
    promotions.string("text", 256).notNullable();
    //start_date
    promotions
      .datetime("start_date")
      .notNullable()
      .defaultTo(knex.CURRENT_DATE)
      .defaultTo(knex.CURRENT_TIMESTAMP);
    //end_date
    promotions.datetime("end_date").notNullable().defaultTo();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("promotions");
};

