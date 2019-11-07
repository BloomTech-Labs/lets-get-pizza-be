const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../data/db-config");
const Locations = require("../components/locations/locations-model");

router.post('/register', (req, res) => {
    //Register user and hash password
    let location = req.body;
    const hash = bcrypt.hashSync(location.password, 10);
    location.password = hash;

    db("locations").insert(location)
        .then(saved => {
            const token = generateToken(saved);
            const username = location.username;
            res.status(201).json({
                token,
                username
            });
        })
        .catch(({ message }) => {
            res.status(500).json(({
                message
            }));
        })
});

router.put('/claim/:id', async (req, res) => {
    //Register user and hash password
    let locationCredentials = req.body;
    const location_id = req.params.id
    let location = await Locations.findById(location_id)

    if(!location.password) {
      const hash = bcrypt.hashSync(locationCredentials.password, 10);
      locationCredentials.password = hash;

      location = await Locations.update(locationCredentials, location_id)

      const token = generateToken(location);
      const username = location.username;
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

                res.status(200).json({
                    message: `Welome ${user.username}`,
                    user,
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
