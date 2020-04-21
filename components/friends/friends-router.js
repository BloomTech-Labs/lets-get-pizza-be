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

module.exports = router;
