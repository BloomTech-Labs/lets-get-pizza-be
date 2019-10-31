exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
  
      users.string('Username', 128).unique().notNullable();

      users.string('Email').notNullable().unique();
          
      users.string('Password', 128).notNullable();

      users.string('Profile_Image', 128).notNullable();

      users.string('Display_Name').unique().notNullable()

      users.specificType('Dietary_Preference', 'text ARRAY')

      users.string('Favorite_pizza_toppings', 128)

      users.string('City', 128)

      users.string('State', 128)

    });
  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };