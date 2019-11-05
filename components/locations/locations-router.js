const express = require("express");
const router = express.Router();
const axios = require('axios')
const Locations = require("./locations-model");

//All Locations- Coordinates & ratings for the map
//GET /Locations
//Returns an array of Location Objects, merge our database results with foursquare results
router.get('/map', async (req, res) => {


    var geoip = require('geoip-lite');

    var ip = "207.97.227.239";
    var geo = geoip.lookup(ip);
    const city = geo.city

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "AAK5YW24JUNRUTVSMMRAVVDAJQB2YN3K1IG1XTWP5NYDA1LB",
      client_secret: "WS4TNCUOCJVEIXCZ0ALYXMZ5XJB0SQ11CPICSP2VPCJ1IXIY",
      query: "pizza",
      near: city,
      v: "20190425"
    };

    //Make the axios call.
    const foursquareResponse = await axios.get(endPoint + new URLSearchParams(parameters))
    //This is the list of items returned without all the extra search data.
    const foursquareVenueList = foursquareResponse.data.response.groups[0].items

    //Map over the return and normalize values. Name, Lattitude, and Longitude will all be displayed. fullAddress will be used for comparison purposes.
    const normalizedFoursquareVenues = foursquareVenueList.map(listItem => {
      const venue = listItem.venue
      return {
        name: venue.name,
        latitude: venue.location.lat,
        longitude: venue.location.lng,
        fullAddress: venue.location.address
      }
    })

    //Does database call
    const database_locations = await Locations.findClosestMapLocations(geo.ll[0], geo.ll[1])

    //Merge them together.
    const results = [...new Set([...database_locations, ...normalizedFoursquareVenues])]

    res.json({trueIP: req.ip, providedIP: ip, geo, results})

});

//All Locations- Information for display
//GET /Locations
//Returns an array of Location Objects, merge our database results with foursquare results
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
