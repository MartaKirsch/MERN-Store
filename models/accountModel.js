const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  "login": {
    type: String,
    required: [true,'Login is required']
  },
  "password":{
    type: String,
    required: [true, 'Password is required']
  },
  "orders":[{
    _id: String,
    date: {
      type: Date,
      default: Date.now
    },
    price: Number,
    items:[{_id:String,name:String,price:Number,url:String,quantity:Number}]
  }]
});

//create model
const Account = mongoose.model('account', accountSchema);

module.exports = Account;
