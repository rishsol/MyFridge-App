const { Router } = require('express');
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const app = express.Router();

app.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            err: err
          });
        });
    });
});

module.exports = app;
