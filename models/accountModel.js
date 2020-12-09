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
  }
});

//create model
const Account = mongoose.model('account', accountSchema);

module.exports = Account;
