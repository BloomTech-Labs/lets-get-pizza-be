const query = require('../model.js')

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};


async function find() {
  return await query.find("reviews")
}

function findById(id) {
  return query.findById("reviews", id)
}

function add(review) {
  return query.add("reviews", review)
}

function update(changes, id) {
  return query.update("reviews", changes, id)
}

function remove(id) {
  return query.remove("reviews", id)
}
