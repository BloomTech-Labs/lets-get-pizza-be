exports.up = function(knex) {
    return knex.schema.createTable('reviews', reviews => {
      reviews.increments();
  
      reviews
        .string('user_id', 128)
        .notNullable()
        .unique();

      reviews
        .string('business_id', 128)
        .notNullable()
          
      reviews.string('rating', 128).notNullable();

      reviews.string('review_title', 128).notNullable();

      reviews.string('review_body', 128).notNullable();
    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews');
  };
