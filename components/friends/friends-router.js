const express = require("express");

const Friends = require("./friends-model");

const router = express.Router();

router.get("/", (req, res) => {
  Friends.getFriends()
    .then((friends) => {
      res.json(friends);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get friends" });
    });
});
router.get("/:id", (req, res) => {
  Friends.getByUserId(req.params.id)
    .then((friends) => {
      if(friends.length > 0){
        res.json(friends);
      }else{
        res.status(404).json({message: 'User currently has no friends'})
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get friends" });
    });
});

router.post("/", (req, res) => {
  const friendsData = req.body;

  Friends.insertFriends(friendsData)
    .then((friend) => {
      res.status(201).json(friend);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to add a new friend" });
    });
});

router.put("/:id", validateFriendId, (req, res) => {
  Friends.updateFriend(req.params.id, req.body)
    .then(() => {
      res.status(200).json({
        success: true,
        message: `friend with id ${req.params.id} was updated.`,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Couldn't update this friend.",
      });
    });
});

router.delete("/:id", validateFriendId, (req, res) => {
  Friends.removeFriend(req.params.id)
    .then((deleted) => {
      res.status(200).json({
        success: true,
        message: `friend with id ${req.params.id} was deleted`,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Couldn't delete this friend",
      });
    });
});

//validateFriendID middleware//

function validateFriendId(req, res, next) {
  Friends.getById(req.params.id)
    .then((friend) => {
      if (friend) {
        req.friend = friend;
        next();
      } else {
        res.status(500).json({
          message: "Incorrect ID provided",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "ID required",
        error,
      });
    });
}

module.exports = router;
