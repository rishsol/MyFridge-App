const express = require('express');

const app = express();

app.use('/items', (req, res, next) => {
  const items = [
    {id: 'fafa', item: 'apple', expDate: '12/10/2020'},
    {id: 'fs4s', item: 'orange', expDate: '12/30/2020'}
  ];
  res.status(200).json({
    items: items
  });
});

module.exports = app;
