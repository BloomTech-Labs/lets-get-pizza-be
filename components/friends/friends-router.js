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

module.exports = router;
