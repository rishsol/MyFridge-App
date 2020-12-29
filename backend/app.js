const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  const posts = req.body;
  res.status(201).json();
})

app.use('/items', (req, res, next) => {
  const items = [];
  res.status(200).json({
    items: items
  });
});

module.exports = app;
