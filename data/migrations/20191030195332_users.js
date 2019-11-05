exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
  
      users.string('username', 128).unique().notNullable();

      users.string('email').notNullable().unique();
          
      users.string('password', 128).notNullable();

      users.string('profile_image', 128).notNullable();

      users.string('display_name').unique().notNullable()

      users.specificType('dietary_preference', 'text ARRAY')

      users.string('favorite_pizza_toppings', 128)

      users.string('city', 128)

      users.string('state', 128)

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };