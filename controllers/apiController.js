const Item = require('../models/itemModel');
const Account = require('../models/accountModel');
const session = require('express-session');

const loaditems = (req,res)=>{
  Item.find({}).then(data=>{
    res.json(data);
  }).catch(err=>console.log(err));
};

const checkLogIn = (req, res)=>{
  let sess = req.session;

  if(sess.login)
  {
    res.json({logged:true});
  }
  else
  {
    res.json({logged:false});
  }
}

const register = (req,res) => {

  let account = new Account({
    login:req.body.login,
    password: req.body.password
  });

  account.save().then((docs,err)=>{

    if(err)
    {
      res.json({status:"Failed",err});
    }
    else
    {
      res.json({status:"OK"});
    }

  })

}

module.exports = {
  loaditems,
  checkLogIn,
  register
};
