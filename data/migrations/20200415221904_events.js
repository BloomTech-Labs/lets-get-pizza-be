exports.up = function (knex, Promise) {
  return knex.schema.createTable("events", (events) => {
    events.increments();
    //user_id (change string requirement into integer due to error stated)
    events.integer("user_id").references("id").inTable("users").onUpdate();
    //location_id
    events
      .integer("location_id")
      .notNullable()
      .references("id")
      .inTable("locations")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    //title
    events.string("title", 128).notNullable();
    //description
    events.string("description").notNullable();
    //start_time
    events.datetime("start_time", options={ useTz: false }).notNullable();
    //end_time
    events.datetime('end_time ', options={ useTz: false }).notNullable();
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("events");
};

