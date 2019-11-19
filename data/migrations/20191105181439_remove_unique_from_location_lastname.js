exports.up = function(knex, Promise) {
    // don't forget the return statement
    return knex.schema
      .table('locations', function (table) {
        table.dropColumn('last_name');
      })
      .table('locations', function (table) {
        table.string('last_name', 128).notNullable();
      })
  
  };
  
  exports.down = function(knex, Promise) {
    // drops the entire tables and the two fields
    return knex.schema
      .table('locations', function (table) {
        table.dropColumn('last_name').notNullable();;
      })
      .table('locations', function (table) {
        table.string('last_name', 128).unique().notNullable();
      })
  
  };