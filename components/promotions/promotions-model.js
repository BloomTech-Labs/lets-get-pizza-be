const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};



function find() {
  return db('items')
}

function findById(id) {
  return db('items')
    .where( 'item_id', id )
    .first();
}

function add(item) {
  return db('items')
    .insert(item)
    .returning('item_id')
    .then(res => {
      return findById(res[0])
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

function update(changes, id) {
  return db('items')
    .where('item_id', id)
    .update(changes)
    .returning('item_id')
    .then(res => {
      return findById(res[0])
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

function remove(id) {
  return db('items')
    .where( 'item_id', id )
    .del();
}
