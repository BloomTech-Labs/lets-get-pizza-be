exports.up = function(knex) {
    return knex.schema.createTable('locations', locations => {
      locations.increments();
  
      locations.string('Username', 128).unique().notNullable();

      locations.string('Email').notNullable().unique();
          
      locations.string('Password', 128).notNullable();

      locations.string('First_Name', 128).notNullable();

      locations.string('Last_Name').unique().notNullable();

      locations.string('Foursquare_id', 128).notNullable();

      locations.boolean('Update_foursquare');

      locations.string('Business_name', 128).notNullable();

      locations.string('Latitude', 128).notNullable();

      locations.string('Longitude', 128).notNullable();

      locations.string('Address', 128).notNullable();

      locations.string('Website_url', 128).notNullable();

      locations.string('Official_description', 128).notNullable();

      locations.string('Thumbnail_url', 128).notNullable();

      locations.string('Street_view_image', 128).notNullable();

      locations.string('Order_service', 128).notNullable();

      locations.string('Store_bio', 128).notNullable();

      locations.specificType('Dietary_offerings', 'text ARRAY').notNullable();

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('locations');
  };