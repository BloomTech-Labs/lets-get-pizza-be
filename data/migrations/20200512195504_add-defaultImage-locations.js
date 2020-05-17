
exports.up = function(knex) {
    return knex.schema.alterTable('locations', locations => {
        locations.string("thumbnail_image")
          .defaultTo('https://res.cloudinary.com/plza/image/upload/v1589334585/pizzaIcon_vt9vq9.png')
          .alter()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('locations', locations => {
        locations.string('thumbnail_image').alter()
    })
  };
  