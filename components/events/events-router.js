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

router.get("/:id", validateById, (req, res) => {
  res.status(200).json({event: req.event})

  
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

router.put("/:id", validateById, (req, res) => {
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

router.delete("/:id", validateById, (req, res) => {
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
    })
})

// Invite a user to an event
// Body must include the following
// inviter_user_id, invitee_user_id
router.post("/:id/invite", validateById, validateInviteInfo, validateEventCreator, validateNotInvited, (req, res) => {
  let { id } = req.params
  let invite = {
    event_id: parseInt(id),
    ...req.invite
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
// @id -> event id
// @invite_id -> invite id
router.put("/:id/invite/:invite_id", validateById, validateInviteById, validateResponse, (req, res) => {
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

// Get all invites for single event
router.get("/:id/invites", validateById, (req, res) => {
  let id = parseInt(req.params.id)

  Events.getInvitesByEvent({event_id: id})
    .then(invites => {
      res.status(200).json(invites)
    })
    .catch(err => {
      res.status(500).json({message: "Error retrieving invites"})
    })
})

// Custom Middleware

function validateById(req, res, next) {
  let { id } = req.params
  Events.findById(id)
    .then(event => {
      if(event){
        req.event = event
        next()
      } else {
        res.status(404).json({message: "No event with the given ID"})
      }
    })
    .catch(() => {
      res.status(500).json({message: "There was an error getting the event"})
    })
}

function validateInviteInfo(req, res, next) {
  let validation = ["invitee_user_id", "inviter_user_id"]
  
  // Make array of object's keys
  let request = Object.keys(req.body)

  validation.forEach(key => {
    if(!request.includes(key)){
      res.status(400).json({message: `Missing required field ${key}`})
    }
  })
  
  req.invite = {
    invitee_user_id: req.body.invitee_user_id,
    inviter_user_id: req.body.inviter_user_id
  }

  next()
}

function validateNotInvited(req, res, next) {
  let { id } = req.params
  let { invitee_user_id } = req.invite
  let filter = {event_id: id}

  Events.getInvitesByEvent(filter)
    .then(events => {
      let filtered = events.filter(event => event.invitee_user_id === invitee_user_id)
      return filtered
    })
    .then(invites => {
      if(invites.length !== 0) {
        res.status(404).json({message: `User with ID: ${invitee_user_id} has already been invited`})
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({message: "There was an error with your invite"})
    })
}

function validateEventCreator(req, res, next) {
  let { inviter_user_id } = req.invite

  if(req.event.user_id === inviter_user_id) {
    next()
  } else{
    res.status(401).json({message: `User with ID: ${inviter_user_id} does not have proper access`})
  }
}

function validateInviteById(req, res, next) {
  let id = req.params.invite_id

  Events.getInviteById(id)
    .then(event => {
      if(event){
        next()
      }else {
        res.status(404).json({message: "No invite with given id"})
      }
    })
    .catch(err => {
      res.status(500).json({message: "There was an error with your invite"})
    })
}

function validateResponse(req, res, next) {
  const responses = ['accepted', 'interested', 'declined']
  if(!req.body.response) {
    res.status(400).json({message: "Missing required response field"})
  }else if(!responses.includes(req.body.response.toLowerCase())) {
    res.status(400).json({message: "Response must be one of the following: accepted, interested, declined"})
  } else {
    next()
  }
}

module.exports = router;
