const express = require("express");
const router = express.Router();
const axios = require('axios')

//Default model for locations
const Locations = require("./locations-model");


const authenticate = require('../../auth/restricted-middleware');

//Converts the given ip address to a lat/long
var geoip = require('geoip-lite');


const multer = require('../../config/multer')
const multerUploads = multer.multerUploads
const dataUri = multer.dataUri

const cloudinary = require('../../config/cloudinaryConfig')
const uploader = cloudinary.uploader
const cloudinaryConfig = cloudinary.cloudinaryConfig

//Location Dashboard- for when they first log in.
//GET /Locations/:id
//Returns the Location object who has logged in, and any dashboard information.
router.get('/dashboard', authenticate, async (req, res) => {
  const id = req.decodedToken.location_id;
  let location = await Locations.findById(id);

  if(location.update_foursquare) {
    //update the record based on a call
    location = await Locations.update(await foursquareIdSearch(location.foursquare_id, id), id)
  }
  if (location.password) {
    delete location.password;
  }
  res.json(location)
})


//All Locations- Coordinates & ratings for the map
//GET /Locations
//Returns an array of Location Objects, merge our database results with foursquare results
router.get('/map', async (req, res) => {
    const {userLatitude, userLongitude, userCity, userState, userCountry} = await userGeoLocation(req);

    //Searches OUR database
    const databaseLocations = await Locations.findClosestMapLocations(userLatitude, userLongitude)

    //Searchs foursquare for pizza places, and returns an array of name/lat/lng/address
    const normalizedFoursquareCoordinates = await foursquareCoordinateSearch(userLatitude, userLongitude)

    //Merge the results together and return.
    const results = mergeArrays(normalizedFoursquareCoordinates, databaseLocations)

    res.json({
      userLocation: {
        friendlyTitle: `${userCity}, ${userState}, ${userCountry}`,
        userLatitude,
        userLongitude
      },
      results
    })
  });

//All Locations- Information for display
//GET /Locations
//Returns an array of Location Objects, merge our database results with foursquare results
//Returns Name, Address, Thumbnail_url
router.get('/list', async (req, res) => {
    const {userLatitude, userLongitude, userCity, userState, userCountry} = await userGeoLocation(req);

    //Searches OUR database
    const databaseLocations = await Locations.findSearchLocations(userLatitude, userLongitude)

    //Searchs foursquare for pizza places, and returns an array of name/lat/lng/address
    const normalizedFoursquareList = await foursquareListSearch(userLatitude, userLongitude)

    //Merge the results together and return.
    const results = mergeArrays(normalizedFoursquareList, databaseLocations)

    res.json({
        userLocation: {
          friendlyTitle: `${userCity}, ${userState}, ${userCountry}`,
          userLatitude,
          userLongitude
        },
        results
      })
});

router.get('/live/:foursquare_id', async (req, res) => {
  //Do the foursquare call on the id
  let normalizedFoursquareResult = {};
  try {
    normalizedFoursquareResult = await foursquareIdSearch(req.params.foursquare_id)
  }
  catch {
    res.status(500).json({message: "Error reading from foursquare", normalizedFoursquareResult})
  }
  const location = await Locations.add(normalizedFoursquareResult)
  
  if(location.business_name) {
    res.json(location)
  } else {
    if(location.constraint === 'locations_foursquare_id_unique') {
      const location = await Locations.findByFoursquareId(req.params.foursquare_id)
      res.json(location)
    } else {
      res.status(500).json({err: "Unknown error."})
    }
  }
})

//Location Page- for checking out the place.
//GET /Locations/:id
//Returns a single Location object
router.get('/:id', async (req, res) => {
    const id = req.params.id
    let location = await Locations.findById(id);

    /* BACKEND TASK- LOCATION INFORMATION */
    /* Requirement: Return related reviews & promotions along with the location. res.json({location, reviews, promotions}) */
    /* Recommended Steps: 
        import reviews-model.js and promotions-model.js at the top of the page
        write a function in reviews/reviews-model that takes a location id and returns the array of results.
        write a function in promotions/promotion-model that takes a location id and returns the array of results.
        return an object something like res.json({location, reviews, promotions})
    */
    /* CHALLENGE: Before returning, calculate the average rating (total/size) and return that along in the object for easy access on front end.
       HINT: Joins will not easily work, joins are best for 1-to-1 relations, not 1-to-many.
       Probably easiest to use nested .then().catch() or multiple await calls.
    */

    if (location) {
        // Remove the password field before returning anything
        delete location.password;

        // Retrieve all associated content with this location
        const reviews = await Locations.getReviews(id);
        const promotions = await Locations.getPromotions(id);
        const events = await Locations.getEvents(id);


        // Add the average rating to the location object
        const averageRating = await Locations.getAverageRating(id)
        location["average_rating"] = Math.round(averageRating[0].avg * 10) / 10

        res.json({ location, reviews, promotions, events })
    } else {
        res.status(404).json({ message: "Location does not exist" })
    }
});

//Edit Your Info- allow a Location to edit their own information.
//PUT /Locations/
//Takes in the Location information, updates the database, and returns the object.
router.put('/', authenticate, (req, res) => {
    const id  = req.decodedToken.location_id;
    const locationData = req.body;

    Locations.update(locationData, id)
        .then(updatedLocation => {
            res.json(updatedLocation);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update location' });
        });

});

//Edit a locations images
//PUT /Locations/Images
//A separate route is needed because this only takes FORM data, not JSON data.
//This route requires a token, which determines which location is edited
//This route requires a form with the image in an image_raw field, and an image_kind, which is either:
//"thumbnail_image", "street_view_image", "menu_image", or "inside_image"
router.put('/images', authenticate, multerUploads.single("image-raw"), cloudinaryConfig, (req, res) => {
  //Get the id from the token
  const id  = req.decodedToken.location_id;
  const locationData = req.body;

  //The middleware attacked a "file" feild to the req objecct
  if(req.file) {

    //store the process image as a 'data-uri'- this is a process that takes an image and essentially "converts" it to a string
    const file = dataUri(req).content;

    //Uploading the image to cloudinary
    uploader.upload(file)
    .then((result) => {

      //Set the resulting url appropriate to the feild that was passed in, then delete the extra feilds originally needed.
      locationData[locationData.image_kind] = result.url;
      delete locationData.image_raw
      delete locationData.image_kind

      //Add the new data to the database.
      Locations.update(locationData, id)
          .then(updated => {
            res.json(updated);
          })
          .catch (err => {
            res.status(500).json({ message: 'Failed to update location' , err});
          });
    })
    .catch((err) => res.status(400).json({
      messge: 'someting went wrong while processing your request',
      data: { err }
    }))
  } 

});

//DELETE Location- delete's a Location's profile
//PUT /Locations/
//Deletes it for good.
router.delete('/', authenticate, (req, res) => {
    const id = req.decodedToken.location_id;
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
// GEO FUNCTIONS
//-----------------------------------------

const getUserIP = (req) => {
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  //During development, this will return "::1", for localhost. Set to a valid ip instead.
  return ipAddr === "::1" ? "161.185.160.93" : ipAddr;
}

const mergeArrays = (original, newdata, selector = 'name') => {
	newdata.forEach(dat => {
		const foundIndex = original.findIndex(ori => ori[selector] == dat[selector]);
		if (foundIndex >= 0) original.splice(foundIndex, 1, dat);
        else original.push(dat);
	});

	return original;
};


const userGeoLocation = async(req) => {
  const userLocation = {userCity: "", userLatitude: 0, userLongitude: 0}

  if(req.query.search) {
    //Geocoding- https://developer.mapquest.com/documentation/geocoding-api/address/get/
    const geo = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${req.query.search}`)
    const location_info = geo.data.results[0].locations[0]
    //Map the information
    userLocation.userCity = location_info.adminArea5
    userLocation.userState = location_info.adminArea3
    userLocation.userCountry = location_info.adminArea1
    userLocation.userLatitude =  location_info.latLng.lat
    userLocation.userLongitude = location_info.latLng.lng
  } else {
    const ip = getUserIP(req)
    const geo = geoip.lookup(ip);
    //Code that returns a 'geo' object- https://github.com/bluesmoon/node-geoip
    userLocation.userCity = geo.city
    userLocation.userState = geo.region
    userLocation.userCountry = geo.country
    userLocation.userLatitude =  geo.ll[0]
    userLocation.userLongitude = geo.ll[1]
  }

  return userLocation

}


//-----------------------------------------
// FOURSQUARE FUNCTIONS
//-----------------------------------------

const foursquareApiSearch = async (latitude, longitude) => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?";
  const parameters = {
    client_id: process.env.FSCLIENTID,
    client_secret: process.env.FSCLIENTSECRET,
    query: "pizza",
    ll: `${latitude},${longitude}`,
    v: "20190425"
  };

  return await axios.get(endPoint + new URLSearchParams(parameters))
}

const foursquareIdSearch = async (foursquareId, id) => {
  if(!foursquareId){
    return await Locations.findById(id)
  } else {
      const endPoint = `https://api.foursquare.com/v2/venues/${foursquareId}?`;
      const parameters = {
        client_id: process.env.FSCLIENTID,
        client_secret: process.env.FSCLIENTSECRET,
        v: "20190425"
      };
    
      const result = await axios.get(endPoint + new URLSearchParams(parameters))
    
      const v = result.data.response.venue
      return {
        foursquare_id: v.id,
        business_name: v.name,
        latitude: v.location.lat,
        longitude: v.location.lng,
        address: v.location.formattedAddress.join(", "),
        website_url: v.url,
        official_description: v.official_description
      }
  }

}

//Returns an array of objects, with a locations name, latitude, longitude, and address.
const foursquareCoordinateSearch = async(userLatitude, userLongitude) => {
  const foursquareResponse = await foursquareApiSearch(userLatitude, userLongitude)

  const foursquareVenueList = foursquareResponse.data.response.groups[0].items

  //Map over the return and normalize values. Name, Lattitude, and Longitude will all be displayed. fullAddress will be used for comparison purposes.
  return foursquareVenueList.map(listItem => {
    const venue = listItem.venue
    return {
      name: venue.name,
      latitude: venue.location.lat,
      longitude: venue.location.lng,
      address: venue.location.formattedAddress.join(", "),
      foursquare_id: venue.id
    }
  })
}

//Returns an array of objects, with a locations name, address, and thumbnail.
const foursquareListSearch = async(userLatitude, userLongitude) => {
  const foursquareResponse = await foursquareApiSearch(userLatitude, userLongitude)

  const foursquareVenueList = foursquareResponse.data.response.groups[0].items

  //console.log(foursquareVenueList.map((item) => item.venue.photos))

  //Map over the return and normalize values. Name, Lattitude, and Longitude will all be displayed. fullAddress will be used for comparison purposes.
  return foursquareVenueList.map(listItem => {
    const venue = listItem.venue
    return {
      name: venue.name,
      address: venue.location.formattedAddress.join(", "),
      foursquare_id: venue.id
    }
  })
}
