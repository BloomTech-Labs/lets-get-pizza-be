exports.up = function(knex) {
    return knex.schema.createTable('promotions', promotions => {
      promotions.increments();
  
      promotions.string('business_id', 128).notNullable()

      //need to figure out how to do an image here...
      promotions.string('image').notNullable()
          
      promotions.string('title', 128).notNullable();

      promotions.string('text', 128).notNullable();

      promotions.date('startDate').notNullable();

      promotions.date('endDate').notNullable();
    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('promotions');
  };