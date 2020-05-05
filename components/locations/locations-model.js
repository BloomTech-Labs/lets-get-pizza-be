const db = require("../../data/db-config")
const query = require('../model.js')

module.exports = {
    find,
    findClosestMapLocations,
    findSearchLocations,
    findById,
    findByFoursquareId,
    getReviews,
    getAverageRating,
    getPromotions,
    getEvents,
    add,
    update,
    remove
};

const mapSelect = ['business_name AS name', 'latitude', 'longitude', 'address', 'id AS location_id']

function find() {
    return query.find('locations')
}


function findClosestMapLocations(latitude, longitude) {
    const searchRadius = .5
    return query.find('locations', mapSelect)
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
    return query.find('locations', mapSelect)
    .where(function() {
      this.where(function() {
        this.where('latitude', '>', latitude - searchRadius).andWhere('latitude', '<', latitude + searchRadius)
      }).andWhere(function() {
        this.where('longitude', '>', longitude - searchRadius).andWhere('longitude', '<', longitude + searchRadius)
      })
    })
}


function findById(id) {
    return query.findById('locations', id)
}


function findByFoursquareId(id) {
    return query.findBy('locations', {'foursquare_id': id})
}

function getReviews(id) {
    const select = [ 'r.id','u.id','u.username','u.display_name','u.profile_image','r.rating','r.review_title','r.review_text']
    
    return query.findBy('reviews as r', {'r.location_id': id}, select)
        .join('users as u', 'u.id', 'r.user_id')
}

function getAverageRating(id) {
    return db('reviews').where('location_id', id).avg('rating')
}

function getPromotions(id) {
    return query.findBy('promotions', {location_id: id})
}

function getEvents(id) {
    const select = ['e.id as id', 'u.id as user_id', 'u.username', 'u.display_name', 'u.profile_image', 'e.title', 'e.description', 'e.start_time', 'e.end_time']

    return query.findBy('events as e', {'e.location_id': id}, select)
        .join('users as u', 'u.id', 'e.user_id')

}

function add(location) {
    return query.add('locations', location)
}

function update(changes, id) {
    return query.update('locations', changes, id)
}

function remove(id) {
    return query.remove('locations', id)
}
