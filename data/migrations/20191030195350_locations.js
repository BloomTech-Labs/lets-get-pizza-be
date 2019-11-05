exports.up = function(knex) {
    return knex.schema.createTable('locations', locations => {
      locations.increments();

      locations.string('username', 128).unique().notNullable();

      locations.string('email').notNullable().unique();

      locations.string('password', 128).notNullable();

      locations.string('first_name', 128).notNullable();

      locations.string('last_name').unique().notNullable();

      locations.string('foursquare_id', 128).notNullable();

      locations.boolean('update_foursquare');

      locations.string('business_name', 128).notNullable();

      locations.string('latitude', 128).notNullable();

      locations.string('longitude', 128).notNullable();

      locations.string('address', 128).notNullable();

      locations.string('website_url', 128).notNullable();

      locations.string('official_description', 128).notNullable();

      locations.string('thumbnail_url', 128).notNullable();

      locations.string('street_view_image', 128).notNullable();

      locations.string('order_service', 128).notNullable();

      locations.string('store_bio', 128).notNullable();

      locations.specificType('dietary_offerings', 'text ARRAY').notNullable();

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('locations');
  };
