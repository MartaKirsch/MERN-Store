const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

  date: {
    type: Date,
    default: Date.now
  },
  price: Number,
  items:[{_id:String,quantity:Number}]

});

//create model
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
