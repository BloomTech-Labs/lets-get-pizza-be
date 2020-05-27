const express = require("express");

const SavedPromos = require("./promos-model.js");

const router = express.Router();

router.get("/users/:id", (req, res) => {
  let user_id = req.params.id;
  SavedPromos.findBy({ user_id })
    .then((promotions) => {
      res.json(promotions);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get promotions" });
    });
});

router.post("/", (req, res) => {
  const promoData = req.body;

  SavedPromos.add(promoData)
    .then((promo) => {
      res.status(201).json(promo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  SavedPromos.remove(req.params.id)
    .then((deleted) => {
      res.send("Success.");
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete event" });
    });
});

module.exports = router;
