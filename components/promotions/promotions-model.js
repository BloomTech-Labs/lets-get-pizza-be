const query = require('../model.js')

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};



function find() {
  return query.find('promotions')
}

function findById(id) {
  return query.findById('promotions', id)
}

function add(promotion) {
  return query.add('promotions', promotion)
}

function update(changes, id) {
  return query.update('promotions', changes, id)
}

function remove(id) {
  return query.remove('promotions', id)
}
