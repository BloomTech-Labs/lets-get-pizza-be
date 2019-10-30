const db = require("../../data/db-config")

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('locations')
}

function findById(id) {
    return db('locations')
        .where('location_id', id)
        .first();
}

function add(location) {
    return db('locations')
        .insert(location)
        .returning('location_id')
        .then(res => {
            return findById(res[0])
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

function update(changes, id) {
    return db('locations')
        .where('location_id', id)
        .update(changes);
}

function remove(id) {
    return db('locations')
        .where('location_id', id)
        .del();
}