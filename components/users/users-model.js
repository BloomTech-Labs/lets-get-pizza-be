const db =  require("../../data/db-config")

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .where('id', id)
        .first();
}

function add(user) {
    return db('users')
        .insert(user)
        .returning('id')
        .then(res => {
            return findById(res[0])
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

function update(changes, id) {
    return db('users')
        .where('id', id)
        .update(changes);
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del();
}
