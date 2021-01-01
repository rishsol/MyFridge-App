const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Item = require('./models/items');

const app = express();

mongoose.connect('mongodb+srv://rishsol:Gb3tpm6uXjGs9fF@cluster0.lqzuy.mongodb.net/MyFridge?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb');
  });

app.use(bodyParser.json());

//mongodb = Gb3tpm6uXjGs9fF;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/items', (req, res, next) => {
  const items = []
  for (let obj of req.body) {
    items.push(new Item({
      item: obj.item,
      expDate: obj.expDate
    }));
  }
  for (let item of items) {
    item.save();
  }
  res.status(201).json();
})

app.get('/items', (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      items: documents
    });
  });
});

app.delete('/items/:id', (req, res, next) => {
  Item.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'deleted item'});
  });
});

module.exports = app;
