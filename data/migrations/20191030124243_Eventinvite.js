exports.up = function(knex) {
    return knex.schema.createTable('Eventinvites', Eventinvites => {
      Eventinvites.increments();
  
      Eventinvites.string('Event_id', 128).notNullable()

      Eventinvites.string('Inviter_user_id').notNullable()
          
      Eventinvites.string('Invitee_user_id', 128).notNullable();

      Eventinvites.string('Response', 128).notNullable();

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Eventinvites');
  };