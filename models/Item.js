const mongoose = require('mongoose');

const { Schema } = mongoose;

//Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ItemModelClass = mongoose.model('shop', ItemSchema);

module.exports = ItemModelClass;
