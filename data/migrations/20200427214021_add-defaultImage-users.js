
exports.up = function(knex) {
  return knex.schema.alterTable('users', users => {
      users.string("profile_image")
        .defaultTo('https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg')
        .alter()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', users => {
      users.string('profile_image').alter()
  })
};
