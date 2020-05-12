const express = require("express");

const Reviews = require("./reviews-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Reviews.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get reviews" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Reviews.findById(id)
    .then((review) => {
      if (review) {
        res.json(review);
      } else {
        res
          .status(404)
          .json({ message: "Could not find review with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get reviews" });
    });
});

router.post("/", (req, res) => {
  const reviewData = req.body;

  Reviews.add(reviewData)
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new review" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const reviewData = req.body;

  Reviews.update(reviewData, id)
    .then((updatedReview) => {
      res.json(updatedReview);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update review" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Reviews.remove(id)
    .then((deleted) => {
      res.send("Success.");
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete review" });
    });
});

router.get("/users/:id", (req, res) => {
  let user_id = req.params.id;
  Reviews.findBy({ user_id })
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
