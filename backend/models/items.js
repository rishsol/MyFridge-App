const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  item: String,
  expDate: String
});

module.exports = mongoose.model('Item', itemSchema);
