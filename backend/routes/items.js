const express = require('express');
const Item = require('../models/items');

const checkAuth = require('../middleware/check-auth');
const app = express.Router();

app.post('', checkAuth, (req, res, next) => {
  const items = []
  for (let obj of req.body) {
    items.push(new Item({
      item: obj.item,
      expDate: obj.expDate
    }));
  }
  for (let item of items) {
    item.save()
  }
  res.status(201).json();
});

app.get('', (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      items: documents
    });
  });
});

app.put('/:id', checkAuth, (req, res, next) => {
  const item = new Item({
    _id: req.body.id,
    item: req.body.item,
    expDate: req.body.expDate
  });
  Item.updateOne({_id: req.params.id }, item).then(result => {
    res.status(200).json({message: 'updated item'});
  });
});

app.delete('/:id', checkAuth, (req, res, next) => {
  Item.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'deleted item'});
  });
});

module.exports = app;
