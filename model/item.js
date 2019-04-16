const mongoose = require('mongoose');
const item = mongoose.Schema({
   itemname: String,
   description: String
})

module.exports = mongoose.model('Item', item);