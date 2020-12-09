const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  "name": {
    type: String,
    required: [true,'The name is required']
  },
  "price":{
    type: Number,
    required: [true, 'The price is required']
  },
  "url":{
    type:String,
    required: [true, 'The img url is required']
  }
});

//create model
const Item = mongoose.model('item', itemSchema);

module.exports = Item;
