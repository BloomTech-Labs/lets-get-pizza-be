const router = require("express").Router();
const bcrypt = require("bcryptjs");
const axios = require('axios');
const jwt = require("jsonwebtoken");
const db = require("../data/db-config");
const Locations = require("../components/locations/locations-model");

router.post('/register', async (req, res) => {
    //Register user and hash password
    let location = req.body;
    const hash = bcrypt.hashSync(location.password, 10);
    location.password = hash;

    //The function takes in & returns a location object
    location = await getCoordinatesFromInput(location)

    db("locations").insert(location).returning('id')
        .then(async(saved) => {
            const location = await db("locations").where('id', saved[0]).first()
            delete location.password
            const token = generateToken(location);
            res.status(201).json({
                token,
                location
            });
        })
        .catch(({ message }) => {
            res.status(500).json(({
                message
            }));
        })
});

router.post('/claim/:id', async (req, res) => {
    //Register user and hash password
    let locationCredentials = req.body;
    const location_id = req.params.id
    let location = await Locations.findById(location_id)

    if(!location.password) {
      const hash = bcrypt.hashSync(locationCredentials.password, 10);
      locationCredentials.password = hash;

      location = await Locations.update(locationCredentials, location_id)

      const token = generateToken(location);
      delete location.password
      res.status(201).json({token, location});

    } else {
      res.status(400).json({err: "This is already claimed."})
    }

});

router.post('/login', (req, res) => {
    //Login user
    let { username, password } = req.body;

    db("locations").where({ username }).first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                delete user.password
                res.status(200).json({
                    message: `Welome ${user.username}`,
                    location: user,
                    token,
                });
            } else {
                res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        })
        .catch(({ message }) => {
            res.status(500).json({
                message
            });
        })
});

router.post('/refresh', (req, res) => {
     const { username } = req.body

     db("locations").where({ username }).first()
        .then(user => {
            if(user){
                const token = generateToken(user)
                res.status(200).json({ token })
            }else {
                res.status(401).json({
                    message: 'Invalid username'
                })
            }
        })
        .catch(({ message }) => {
            res.status(500).json({
                message
            })
        })
})

function generateToken(user) {
    //Header payload and verify signature
    const payload = {
        location_id: user.id,
        username: user.username,
    };

    //Token expiration
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;

const getCoordinatesFromInput = async (location) => {
    //Geocode the input address to Lat/Long
    //Geocoding- https://developer.mapquest.com/documentation/geocoding-api/address/get/
    const geo = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${location.address}`)
    const location_info = geo.data.results[0].locations[0]
    location.latitude =  location_info.latLng.lat
    location.longitude = location_info.latLng.lng
    return location
}