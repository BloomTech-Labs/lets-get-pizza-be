const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};



function find() {
  return db('promotions')
}

function findById(id) {
  return db('promotions')
    .where( 'id', id )
    .first();
}

function add(promotion) {
  return db('promotions')
    .insert(promotion)
    .returning('id')
    .then(res => {
      return findById(res[0])
    })
    .catch(err => {
      return err
    })
}

function update(changes, id) {
  return db('promotions')
    .where('id', id)
    .update(changes)
    .returning('id')
    .then(res => {
      return findById(res[0])
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

function remove(id) {
  return db('promotions')
    .where( 'id', id )
    .del();
}
