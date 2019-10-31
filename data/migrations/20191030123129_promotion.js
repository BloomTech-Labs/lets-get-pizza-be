exports.up = function(knex) {
    return knex.schema.createTable('promotions', promotions => {
      promotions.increments();
  
      promotions.string('Business_id', 128).notNullable()

      //need to figure out how to do an image here...
      promotions.string('Image').notNullable()
          
      promotions.string('Title', 128).notNullable();

      promotions.string('Text', 128).notNullable();

      promotions.date('StartDate').notNullable();

      promotions.date('EndDate').notNullable();
    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('promotions');
  };