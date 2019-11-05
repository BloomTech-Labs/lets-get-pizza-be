exports.up = function(knex) {
    return knex.schema.createTable('events', events => {
      events.increments();
  
      events.string('account_creator_id', 128).notNullable()

      events.string('business_id').notNullable()
          
      events.string('title', 128).notNullable();

      events.string('description', 128).notNullable();

      events.date('dateTime', 128).notNullable();

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('events');
  };