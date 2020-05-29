const query = require('../model')
module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findBy,
  findByLocId
};

const select = [
  "events.location_id",
  "events.user_id",
  "events.id",
  "events.title",
  "events.description",
  "events.start_time",
  "events.end_time",
  "locations.business_name",
  "locations.address"
]

const join = ["locations", "locations.id", "events.location_id"]

function find() {
  return query.find('events', select)
              .join(...join)
}


function findById(id) {
  return query.findById('events', id, select, 'events.id')
    .join(...join)
}

function add(event) {
  return query.add('events', event)
}

function update(changes, id) {
  return query.update('events', changes, id)
}

function remove(id) {
  return query.remove('events', id)
}

function findBy(filter) {
  return query.findBy('events', filter, select)
    .join(...join)
}

function findByLocId(id) {
  return query.find('events')
    .where('location_id', id);
}
