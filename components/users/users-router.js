const express = require("express");
const router = express.Router();
const Users = require("./users-model");

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
});

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