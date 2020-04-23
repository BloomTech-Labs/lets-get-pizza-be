const express = require("express");

const Friends = require("./friends-model");

const router = express.Router();

<<<<<<< HEAD
router.get('/', (req, res) => {
=======
router.get("/", (req, res) => {
>>>>>>> master
  Friends.getFriends()
    .then((friends) => {
      res.json(friends);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get friends" });
    });
});
router.get("/:id", (req, res) => {
  Friends.getById(req.params.id)
    .then((friends) => {
      res.json(friends);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get friends" });
    });
});

<<<<<<< HEAD
router.post('/', (req, res) => {
=======
router.post("/", (req, res) => {
>>>>>>> master
  const friendsData = req.body;

  Friends.insertFriends(friendsData)
    .then((friend) => {
      res.status(201).json(friend);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to add a new friend" });
    });
});

<<<<<<< HEAD
router.put('/:id', validateFriendId, (req,res) => {
  Friends.updateFriend(req.params.id, req.body)
  .then (() => {
    res.status(200).json ({
      success: true, 
      message: `friend with id ${req.params.id} was updated.`
    });
  })
  .catch (error => {
    res.status(500).json ({
      success:false,
      message: "Couldn't update this friend." 
    });
  });
});


router.delete('/:id', validateFriendId, (req, res) => {
  

  Friends.removeFriend(req.params.id)
  .then (() => {
    res.status(200).json ({
      success: true, 
      message: `friend with id ${req.params.id} was deleted`
      });
  })
  .catch (error => {
    res.status(500).json ({
      success:false, 
      message: "Couldn't delete this friend"
    });
  });
});

//validateFriendID middleware// 

function validateFriendId (req,res,next) {
  Friends.getById(req.params.id)
  .then(friend => {
    if(friend) {
      req.friend = friend;
      next();
    } else {
      res.status(500).json ({
        message: "No friend with this ID exists"
      });
    };
  })
  .catch(error => {
    res.status(500).json ({
      message: "ID required", error
    });
  });
};
=======
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Friends.getById(id)
    .then((friend) => {
      if (friend) {
        Friends.updateFriend(changes, id).then((updated) => {
          res.json(updated);
        });
      } else {
        res.status(404).json({ message: "Could not find Friend with that id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to update frined" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Friends.removeFriend(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find friend with id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "cound not delete friend" });
    });
});
>>>>>>> master

module.exports = router;
