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
        .where('user_id', id)
        .first();
}

function add(user) {
    return db('users')
        .insert(user)
        .returning('user_id')
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
        .where('user_id', id)
        .update(changes);
}

function remove(id) {
    return db('users')
        .where('user_id', id)
        .del();
}