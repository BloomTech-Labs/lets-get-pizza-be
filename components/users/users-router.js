const express = require("express");
const router = express.Router();
const Users = require("./users-model");

//All Users- for admin/moderation purposes only, no public view
//GET /Users
//Returns an array of User Objects that has only publically identifying information, for banning/etc.
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
});

//User Profile- for looking at your friends' profile
//GET /Users/:id
//Returns a single user object
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' })
            }
        })
        .catch(err => { res.status(500).json({ message: 'Failed to get users' }); });
});

//User Dashboard- for when you first log in.
//GET /Users/:id
//Returns the user object who has logged in, and any dashboard information.
router.get('/dashboard', (req, res) => {
  //Figure out auth before this really.
})

//Register User- creates a user reference in our databse.
//POST /Users/
//Takes in the new user information, adds it to the database, and returns the object.
router.post('/', (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new user' });
        });

});

//Edit Your Info- allow a user to edit their own information.
//PUT /Users/
//Takes in the user information, updates the database, and returns the object.
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    Users.update(userData, id)
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update user' });
        });
});

//DELETE USER- delete's a user's profile
//PUT /Users/
//Deletes it for good.
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(deleted => {
            res.send("Success.")
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete user' })
        });
});

module.exports = router;
