exports.up = function (knex) {
    return knex.schema.createTable("eventinvites", EI => {
    EI.increments()  

    EI.integer("event_id")
      .references("events.id")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
  
    EI.integer("inviter_user_id")
      .references("users.id")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
  
    EI.integer("invitee_user_id")
      .references("users.id")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
    
      // response options should be `pending`, `accepted`, `interested`, `declined` 
    EI.string("response", 128)
      .defaultTo("pending")
    });
  };
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("eventinvites");
  };
  