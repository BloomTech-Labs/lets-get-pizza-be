const db = require("../../data/db-config")

module.exports = {
    find,
    findClosestMapLocations,
    findSearchLocations,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('locations')
}


function findClosestMapLocations(latitude, longitude) {
    const searchRadius = .5
    return db('locations')
    .select('business_name AS name', 'latitude', 'longitude', 'address', 'id AS location_id')
    .where(function() {
      this.where(function() {
        this.where('latitude', '>', latitude - searchRadius).andWhere('latitude', '<', latitude + searchRadius)
      }).andWhere(function() {
        this.where('longitude', '>', longitude - searchRadius).andWhere('longitude', '<', longitude + searchRadius)
      })
    })
}


function findSearchLocations(latitude, longitude) {
    const searchRadius = .5
    return db('locations')
    .select('business_name AS name', 'address', 'thumbnail_url', 'id AS location_id')
    .where(function() {
      this.where(function() {
        this.where('latitude', '>', latitude - searchRadius).andWhere('latitude', '<', latitude + searchRadius)
      }).andWhere(function() {
        this.where('longitude', '>', longitude - searchRadius).andWhere('longitude', '<', longitude + searchRadius)
      })
    })
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
