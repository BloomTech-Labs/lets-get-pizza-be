exports.up = function(knex) {
    return knex.schema.createTable('events', events => {
      events.increments();
  
      events.string('Account_creator_id', 128).notNullable()

      events.string('Business_id').notNullable()
          
      events.string('Title', 128).notNullable();

      events.string('Description', 128).notNullable();

      events.date('DateTime', 128).notNullable();

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('events');
  };