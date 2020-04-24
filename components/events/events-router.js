const express = require("express");

const Events = require("./events-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Events.find()
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get events" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Events.findById(id)
    .then((event) => {
      if (event) {
        res.json(event);
      } else {
        res
          .status(404)
          .json({ message: "Could not find event with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get events" });
    });
});

router.post("/", (req, res) => {
  const eventData = req.body;

  Events.add(eventData)
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new event" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const eventData = req.body;

  Events.update(eventData, id)
    .then((updatedEvent) => {
      res.json(updatedEvent);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update event" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Events.remove(id)
    .then((deleted) => {
      res.send("Success.");
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete event" });
    });
});

router.get("/users/:id", (req, res) => {
  let user_id = req.params.id;
  Events.findBy({ user_id })
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
