exports.up = function(knex, Promise) {
  // don't forget the return statement
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('user_id');
      tbl.text('username', 128).notNullable();
      tbl.text('password', 255).notNullable();

    })
};

exports.down = function(knex, Promise) {
  // drops the entire table
  return knex.schema
    .dropTableIfExists('users')
};
