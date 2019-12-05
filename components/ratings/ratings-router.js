const express = require('express');

const Items = require('./item-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Items.find()
  .then(items => {
    res.json(items);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get items' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Items.findById(id)
  .then(item => {
    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ message: 'Could not find item with given id.' })
    }
  })
  .catch(err => {res.status(500).json({ message: 'Failed to get items' });});
});


router.post('/', (req, res) => {
  const itemData = req.body;

  Items.add(itemData)
  .then(item => {
    res.status(201).json(item);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new item' });
  });

});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const itemData = req.body;

  Items.update(itemData, id)
  .then(updatedItem => {
    res.json(updatedItem);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update item' });
  });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Items.remove(id)
  .then(deleted => {
    res.send("Success.")
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete item' })
  });
});

module.exports = router;
