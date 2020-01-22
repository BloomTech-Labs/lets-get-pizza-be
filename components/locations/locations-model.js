const db = require("../../data/db-config")

module.exports = {
    find,
    findClosestMapLocations,
    findSearchLocations,
    findById,
    findByFoursquareId,
    getReviews,
    getPromotions,
    getEvents,
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

function getReviews(id) {
    return db('reviews as r').where('r.location_id', id)
        .join('users as u', 'u.id', 'r.user_id')
        .select(
            'r.id',
            'u.id',
            'u.username',
            'u.display_name',
            'u.profile_image',
            'r.rating',
            'r.review_title',
            'r.review_text'
        )
}

function getPromotions(id) {
    return db('promotions').where('location_id', id);
}

function getEvents(id) {
    return db('events as e').where('location_id', id)
        .join('users as u', 'u.id', 'e.user_id')
        .select(
            'e.id',
            'u.id',
            'u.username',
            'u.display_name',
            'u.profile_image',
            'e.title',
            'e.description',
            'e.start_time',
            'e.end_time'
        );
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
