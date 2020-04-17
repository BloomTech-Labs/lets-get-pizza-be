exports.up = function (knex, Promise) {
  // it is the change we want to make to the schema
  return knex.schema.createTable("reviews", (reviews) => {
    reviews.increments();
    //user_id
    reviews
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    //location_id
    reviews
      .integer("location_id")
      .notNullable()
      .references("id")
      .inTable("locations")
      .onDelete("cascade")
      .onUpdate("CASCADE");
    //rating
    reviews.integer("rating").notNullable();
    //review_title
    reviews.string("review_title", 128);
    //review_text
    reviews.string("review_text");
  });
};
exports.down = function (knex, Promise) {
  // it is simply used to undo the change when needed
  return knex.schema.dropTableIfExists("reviews");
};

