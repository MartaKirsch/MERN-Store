const Item = require('../models/itemModel');

const loaditems = (req,res)=>{
  Item.find({}).then(data=>{
    res.json(data);
  }).catch(err=>console.log(err));
};


module.exports = {
  loaditems
};
