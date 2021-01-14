const { Router } = require('express');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Incorrect Password'
      });
    }
    const token = jwt.sign({email: fetchedUser.email, id: fetchedUser._id}, 'privateKey', {expiresIn: '1h'});
    res.status(200).json({
      token: token
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth failed'
    });
  });
});

module.exports = app;
