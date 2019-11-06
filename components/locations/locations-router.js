const express = require("express");
const router = express.Router();
const axios = require('axios')
//Converts the given ip address to a lat/long
var geoip = require('geoip-lite');
const Locations = require("./locations-model");


//All Locations- Coordinates & ratings for the map
//GET /Locations
//Returns an array of Location Objects, merge our database results with foursquare results
router.get('/map', async (req, res) => {
    const {userLatitude, userLongitude, userCity} = await userGeoLocation(req);

    //Searches OUR database
    const databaseLocations = await Locations.findClosestMapLocations(userLatitude, userLongitude)

    //Searchs foursquare for pizza places, and returns an array of name/lat/lng/address
    const normalizedFoursquareCoordinates = await foursquareCoordinateSearch(userCity)

    //Merge the results together and return.
    const results = [...new Set([...databaseLocations, ...normalizedFoursquareCoordinates])]

    res.json(results)

});

//All Locations- Information for display
//GET /Locations
//Returns an array of Location Objects, merge our database results with foursquare results
//Returns Name, Address, Thumbnail_url
router.get('/list', async (req, res) => {
    const {userLatitude, userLongitude, userCity} = await userGeoLocation(req);

    //Searches OUR database
    const databaseLocations = await Locations.findSearchLocations(userLatitude, userLongitude)

    //Searchs foursquare for pizza places, and returns an array of name/lat/lng/address
    const normalizedFoursquareList = await foursquareListSearch(userCity)

    //Merge the results together and return.
    const results = [...new Set([...databaseLocations, ...normalizedFoursquareList])]

    res.json(results)
});

router.get('/live/:foursquare_id', async (req, res) => {
  //Do the foursquare call on the id
  const normalizedFoursquareResult = await foursquareIdSearch(req.params.foursquare_id)

  //Map it to an item, save, and return
  res.json(normalizedFoursquareResult)

})

//Location Dashboard- for when they first log in.
//GET /Locations/:id
//Returns the Location object who has logged in, and any dashboard information.
router.get('/dashboard', (req, res) => {
  //Figure out auth before this really.
})

//Location Page- for checking out the place.
//GET /Locations/:id
//Returns a single Location object
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const location = await Locations.findById(id)
    if(location.update_foursquare) {
      //update the record based on a call
      //const location = await Locations.update(await foursquareIdSearch(location.foursquare_id), id)
    }
    res.json(location)
});

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

//-----------------------------------------
// FOURSQUARE FUNCTIONS
//-----------------------------------------

const foursquareApiSearch = async (cityName) => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?";
  const parameters = {
    client_id: "AAK5YW24JUNRUTVSMMRAVVDAJQB2YN3K1IG1XTWP5NYDA1LB",
    client_secret: "WS4TNCUOCJVEIXCZ0ALYXMZ5XJB0SQ11CPICSP2VPCJ1IXIY",
    query: "pizza",
    near: cityName,
    v: "20190425"
  };

  return await axios.get(endPoint + new URLSearchParams(parameters))
}

const foursquareIdSearch = async (foursquareId) => {
  const endPoint = `https://api.foursquare.com/v2/venues/${foursquareId}?`;
  const parameters = {
    client_id: "AAK5YW24JUNRUTVSMMRAVVDAJQB2YN3K1IG1XTWP5NYDA1LB",
    client_secret: "WS4TNCUOCJVEIXCZ0ALYXMZ5XJB0SQ11CPICSP2VPCJ1IXIY",
    v: "20190425"
  };

  const result = await axios.get(endPoint + new URLSearchParams(parameters))

  const v = result.data.response.venue
  return {
    foursquare_id: v.id,
    business_name: v.name,
    latitude: v.location.lat,
    longitude: v.location.lng,
    address: v.location.formattedAddress,
    website_url: v.url,
    official_description: v.official_description,
  }


  // locations.string('username', 128).unique().notNullable();
  //
  // locations.string('email').notNullable().unique();
  //
  // locations.string('password', 128).notNullable();
  //
  // locations.string('first_name', 128).notNullable();
  //
  // locations.string('last_name').unique().notNullable();
  //
  // locations.string('official_description', 128).notNullable();
  //
  // locations.string('thumbnail_url', 128).notNullable();
  //
  // locations.string('street_view_image', 128).notNullable();
  //
  // locations.string('order_service', 128).notNullable();
  //
  // locations.string('store_bio', 128).notNullable();
  //
  // locations.specificType('dietary_offerings', 'text ARRAY').notNullable();

}

//Returns an array of objects, with a locations name, latitude, longitude, and address.
const foursquareCoordinateSearch = async(cityName) => {
  const foursquareResponse = await foursquareApiSearch(cityName)

  const foursquareVenueList = foursquareResponse.data.response.groups[0].items

  //Map over the return and normalize values. Name, Lattitude, and Longitude will all be displayed. fullAddress will be used for comparison purposes.
  return foursquareVenueList.map(listItem => {
    const venue = listItem.venue
    return {
      name: venue.name,
      latitude: venue.location.lat,
      longitude: venue.location.lng,
      address: venue.location.address,
      foursquare_id: venue.id
    }
  })
}

//Returns an array of objects, with a locations name, address, and thumbnail.
const foursquareListSearch = async(cityName) => {
  const foursquareResponse = await foursquareApiSearch(cityName)

  const foursquareVenueList = foursquareResponse.data.response.groups[0].items

  //console.log(foursquareVenueList.map((item) => item.venue.photos))

  //Map over the return and normalize values. Name, Lattitude, and Longitude will all be displayed. fullAddress will be used for comparison purposes.
  return foursquareVenueList.map(listItem => {
    const venue = listItem.venue
    console.log(venue)
    return {
      name: venue.name,
      address: venue.location.address,
      foursquare_id: venue.id
    }
  })
}

const userGeoLocation = async(req) => {
  const userLocation = {userCity: "", userLatitude: 0, userLongitude: 0}

  if(req.query.search) {
    //Geocoding- https://developer.mapquest.com/documentation/geocoding-api/address/get/
    const geo = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=t9UQLcQuLFV0voTMDxe0fwJhfeEQuWZH&location=${req.query.search}`)
    const location_info = geo.data.results[0].locations[0]
    //Map the information
    userLocation.userCity = location_info.adminArea5
    userLocation.userLatitude =  location_info.latLng.lat
    userLocation.userLongitude = location_info.latLng.lng
  } else {
    //During development, this will return "::1", for localhost. Set to a valid ip instead.
    const ip = req.ip === "::1" ? "161.185.160.93" : req.ip;
    const geo = geoip.lookup(ip);
    //Code that returns a 'geo' object- https://github.com/bluesmoon/node-geoip
    userLocation.userCity = geo.city
    userLocation.userLatitude =  geo.ll[0]
    userLocation.userLongitude = geo.ll[1]
  }

  return userLocation

}
