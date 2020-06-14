const express = require("express");
const router = express.Router();
const Users = require("./users-model");
const cloudinary = require('../../config/cloudinaryConfig.js')
const multer = require('../../config/multer.js')
const cloudinaryConfig = cloudinary.cloudinaryConfig
const uploader = cloudinary.uploader
const multerUploads = multer.multerUploads
const dataUri = multer.dataUri

//All Users- for admin/moderation purposes only, no public view
//GET /Users
//Returns an array of User Objects that has only publically identifying information, for banning/etc.
// router.get('/', (req, res) => {
//     Users.find()
//         .then(users => {
//             res.json(users);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to get users' });
//         });
// });


//User Dashboard- for when you first log in.
//GET /Users/:id
//Returns the user object who has logged in, and any dashboard information.
router.get('/dashboard', (req, res) => {
    const id  = req.decodedToken.user_id;
    console.log(id)

    Users.findById(id)
      .then(user => {
        if (user) {
          delete user.password
          res.json(user)
        } else {
          res.status(404).json({ message: 'Could not find user with given id.' })
        }
      })
      .catch(err => { res.status(500).json({ message: 'Failed to get users' });
    });

})

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

// User Search By Username
// GET /users?username=buddy
// Returns an arry of user objects whose
// username includes query string passed in 
// will return 500 error if no query param present

router.get('/', (req, res) => {
    const { username } = req.query
    Users.find()
        .then(users => {
            const filtered = users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))
            res.status(200).json({users: filtered})
        })
        .catch(err => {
            res.status(500).json({message: 'There was an error', error: err})
        })
})





//Edit Your Info- allow a user to edit their own information.
//PUT /Users/
//Takes in the user information, updates the database, and returns the object.
router.put('/', (req, res) => {
    const id = req.decodedToken.user_id.toString();
    const userData = req.body;

    Users.update(userData, id)
        .then(updatedUser => {
            delete updatedUser.password
            res.status(200).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update user' });
        });
});

router.put('/images', multerUploads.single("image-raw"), cloudinaryConfig,  (req,res) => {
    const id = req.decodedToken.user_id.toString()

    //store the process image as a 'data-uri'- this is a process that takes an image and essentially "converts" it to a string
    const file =  dataUri(req)

    //Uploading the image to cloudinary
     uploader.upload(file.content,
        // transforming image to make it responsive 
        { dpr: "auto", responsive: true, width: "auto", crop: "scale"},
        (error, result) => {
            // set variable equal to the image url
            res.locals.image = result.secure_url
            Users.update({profile_image: res.locals.image}, id)
            .then(updatedUser => {
                delete updatedUser.password
                res.status(200).json(updatedUser)
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update user' });
            })
        })
})

//DELETE USER- delete's a user's profile
//PUT /Users/
//Deletes it for good.
router.delete('/', (req, res) => {
    const id = req.decodedToken.user_id;
    Users.remove(id)
        .then(deleted => {
            res.send({message: `${req.decodedToken.username} successfully deleted`})
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete user' })
        });
});

module.exports = router;
