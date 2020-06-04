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

  // use Promise.all to make two simultaneous queries
  // Events.findBy returns events created by user
  // Events.findInvitedEvents returns events a 
  // user is invited to

  Promise.all([
    Events.findBy({ user_id }),
    Events.findInvitedEvents({invitee_user_id: user_id})
  ])
  .then(([created, invited]) => {
    res.status(200).json({createdEvents: created, invitedEvents: invited})
  })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/locations/:id", (req, res) => {
  let loc_id = req.params.id;
  Events.findByLocId(loc_id)
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    })
})

// Invite a user to an event
// Body must include the following
// inviter_user_id, invitee_user_id
router.post("/:id/invite", (req, res) => {
  let { id } = req.params
  let invite = {
    event_id: parseInt(id),
    ...req.body
  }

  Events.inviteFriend(invite)
    .then(invited => {
      res.status(201).json(invited)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// Update response for event invite
// Body should only include
// response
router.put("/:id/invite/:invite_id", (req, res) => {
  let id = parseInt(req.params.invite_id)
  let updates = {
    response: req.body.response.toLowerCase() 
  }
  Events.updateInvite(updates, id)
    .then(updates => {
      res.status(200).json({invited: updates})
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router;
