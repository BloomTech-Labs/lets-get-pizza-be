const query = require('../model.js')

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findBy
};

function find() {
    return query.find('users')
}

function findById(id) {
    return query.findById('users', id)
}

function findBy(filter) {
    return query.findBy('users', filter)
}

function add(user) {
    return query.add('users', user)
}

function update(changes, id) {
    return query.update('users', changes, id)
}

function remove(id) {
    return query.remove('users', id)
}
