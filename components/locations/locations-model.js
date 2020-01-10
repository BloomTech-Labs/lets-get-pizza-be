const db = require("../../data/db-config")

module.exports = {
    find,
    findClosestMapLocations,
    findSearchLocations,
    findById,
    findByFoursquareId,
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
    .select('business_name AS name', 'address', 'id AS location_id')
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
        .where('id', id)
        .first();
}


function findByFoursquareId(id) {
    return db('locations')
        .where('foursquare_id', id)
        .first();
}


function add(location) {
    return db('locations')
        .insert(location)
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
    return db('locations')
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
    return db('locations')
        .where('id', id)
        .del();
}
