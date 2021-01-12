const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ExpectedConditions } = require('protractor');

const itemsRoutes = require('./routes/items');
const usersRoutes = require('./routes/user');

const items = require('./models/items');

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
  'GET, POST, DELETE, PATCH, PUT, OPTIONS');
  next();
});

app.use('/items', itemsRoutes);
app.use('/signup', usersRoutes);


module.exports = app;
