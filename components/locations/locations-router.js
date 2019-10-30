const express = require("express");
const router = express.Router();
const Locations = require("./locations-model");

router.get('/', (req, res) => {
    Locations.find()
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get locations' });
        });
});

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