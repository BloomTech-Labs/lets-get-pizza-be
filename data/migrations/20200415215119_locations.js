exports.up = function (knex) {
  return knex.schema.createTable("locations", (locations) => {
    locations.increments();
    locations.string("last_name");
    locations.string("username").unique();
    locations.string("email").unique();
    locations.string("password");
    locations.string("first_name");
    locations.boolean("update_foursquare").defaultTo(true);
    locations.string("phone_number");
    locations.string("foursquare_id").unique();
    locations.string("business_name").notNullable();
    locations.specificType("latitude", "double precision").notNullable();
    locations.specificType("longitude", "double precision").notNullable();
    locations.string("address").notNullable();
    locations.string("website_url");
    locations.string("official_description");
    locations.string("thumbnail_image");
    locations.string("inside_image");
    locations.string("street_view_image");
    locations.string("menu_image");
    locations.string("order_service");
    locations.string("store_bio");
    locations.specificType("dietary_offerings", "text ARRAY");
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("locations");
};
