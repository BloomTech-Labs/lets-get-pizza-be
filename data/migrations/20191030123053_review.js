exports.up = function(knex) {
    return knex.schema.createTable('reviews', reviews => {
      reviews.increments();
  
      reviews
        .string('User_id', 128)
        .notNullable()
        .unique();

      reviews
        .string('Business_id', 128)
        .notNullable()
          
      reviews.string('Rating', 128).notNullable();

      reviews.string('Review Title', 128).notNullable();

      reviews.string('Review Body', 128).notNullable();
    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews');
  };
