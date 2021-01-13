const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({

  user:{type:String,required:true},
  name:{type:String,required:true},
  surname:{type:String,required:true},
  city:{type:String,required:true},
  street:{type:String,required:true},
  homeNumber:{type:String,required:true},
  postalCode:{type:String,required:true},
  date: {
    type: Date,
    default: Date.now
  },

});

//create model
const Address = mongoose.model('address', addressSchema);

module.exports = Address;
