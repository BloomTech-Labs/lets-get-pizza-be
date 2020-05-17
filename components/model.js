const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findBy
};



function find(table, selectConfig='*') {
  return db(table)
          .select(...selectConfig)
}

function findById(table, id, selectConfig='*', whereConfig='id') {
  return db(table)
    .where( whereConfig, id )
    .select(...selectConfig)
    .first();
}

function findBy(table, filter, selectConfig='*'){
  return db(table)
    .where(filter)
    .select(...selectConfig)
}

function add(table, info) {
  return db(table)
    .insert(info)
    .returning('id')
    .then(res => {
      return findById(table, res[0])
    })
    .catch(err => {
      return err
    })
}

function update(table, changes, id) {
  return db(table)
    .where('id', id)
    .update(changes)
    .returning('id')
    .then(res => {
      return findById(table, res[0])
    })
    .catch(err => {
      return err
    })
}

function remove(table, id) {
  return db(table)
    .where( 'id', id )
    .del();
}
