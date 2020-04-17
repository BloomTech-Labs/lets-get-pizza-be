exports.up = function (knex) {
  return knex.schema.createTable("eventinvites", (eventinvites) => {
    eventinvites.increments();

    eventinvites.string("event_id", 128).notNullable();

    eventinvites.string("inviter_user_id").notNullable();

    eventinvites.string("invitee_user_id", 128).notNullable();

    eventinvites.string("response", 128).notNullable();
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("eventinvites");
};
