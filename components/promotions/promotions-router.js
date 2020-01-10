const express = require('express');

const Promotions = require('./promotions-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Promotions.find()
  .then(promotions => {
    res.json(promotions);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get promotions' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Promotions.findById(id)
  .then(promotion => {
    if (promotion) {
      res.json(promotion)
    } else {
      res.status(404).json({ message: 'Could not find promotion with given id.' })
    }
  })
  .catch(err => {res.status(500).json({ message: 'Failed to get promotions' });});
});


router.post('/', (req, res) => {
  const promotionData = req.body;

  Promotions.add(promotionData)
  .then(promotion => {
    res.status(201).json(promotion);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new promotion' });
  });

});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const promotionData = req.body;

  Promotions.update(promotionData, id)
  .then(updatedPromotion => {
    res.json(updatedPromotion);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update promotion' });
  });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Promotions.remove(id)
  .then(deleted => {
    res.send("Success.")
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete promotion' })
  });
});

module.exports = router;
