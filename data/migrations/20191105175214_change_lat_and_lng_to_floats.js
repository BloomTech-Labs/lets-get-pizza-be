exports.up = function(knex, Promise) {
  // don't forget the return statement
  return knex.schema
    .table('locations', function (table) {
      table.dropColumn('longitude');
      table.dropColumn('latitude');
    })
    .table('locations', function (table) {
      table.specificType('latitude', 'double precision');
      table.specificType('longitude', 'double precision');
    })

};

exports.down = function(knex, Promise) {
  // drops the entire tables and the two fields
  return knex.schema
    .table('locations', function (table) {
      table.dropColumn('longitude');
      table.dropColumn('latitude');
    })
    .table('locations', function (table) {
      table.string('latitude', 128);
      table.string('longitude', 128);
    })

};
