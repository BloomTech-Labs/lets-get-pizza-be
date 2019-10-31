const express = require("express");
const router = express.Router();
const Locations = require("./locations-model");

//All Locations-
//GET /Locations
//Returns an array of Location Objects 
router.get('/map', (req, res) => {
    Locations.find()
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get locations' });
        });
});

//All Locations-
//GET /Locations
//Returns an array of Location Objects
router.get('/', (req, res) => {
    Locations.find()
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get locations' });
        });
});

//Location Page- for checking out the place.
//GET /Locations/:id
//Returns a single Location object
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Locations.findById(id)
        .then(location => {
            if (location) {
                res.json(location)
            } else {
                res.status(404).json({ message: 'Could not find location with given id.' })
            }
        })
        .catch(err => { res.status(500).json({ message: 'Failed to get locations' }); });
});

//Location Dashboard- for when they first log in.
//GET /Locations/:id
//Returns the Location object who has logged in, and any dashboard information.
router.get('/dashboard', (req, res) => {
  //Figure out auth before this really.
})

//Register Location- creates a Location reference in our databse.
//POST /Locations/
//Takes in the new Location information, adds it to the database, and returns the object.
router.post('/', (req, res) => {
    const locationData = req.body;

    Locations.add(locationData)
        .then(location => {
            res.status(201).json(location);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new location' });
        });

});

//Edit Your Info- allow a Location to edit their own information.
//PUT /Locations/
//Takes in the Location information, updates the database, and returns the object.
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const locationData = req.body;

    Locations.update(locationData, id)
        .then(updatedLocation => {
            res.json(updatedLocation);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update location' });
        });

});

//DELETE Location- delete's a Location's profile
//PUT /Locations/
//Deletes it for good.
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Locations.remove(id)
        .then(deleted => {
            res.send("Success.")
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete location' })
        });
});

module.exports = router;
