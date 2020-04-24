const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};



function find() {
  return db('reviews')
}

function findById(id) {
  return db('reviews')
    .where( 'id', id )
    .first();
}

function add(review) {
  return db('reviews')
    .insert(review)
    .returning('id')
    .then(res => {
      return findById(res[0])
    })
    .catch(err => {
      return err
    })
}

function update(changes, id) {
  return db('reviews')
    .where('id', id)
    .update(changes)
    .returning('id')
    .then(res => {
      return findById(res[0])
    })
    .catch(err => {
      return err
    })
}

function remove(id) {
  return db('reviews')
    .where( 'id', id )
    .del();
}
