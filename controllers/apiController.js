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

  let sess = req.session;

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
      sess.login = req.body.login;
      res.json({status:"OK"});
    }

  })

}

const logIn = (req, res)=>{

  let sess = req.session;

  Account.find({login: req.body.login}).then(docs=>{

    if(docs||docs.length===0)
    {
      if(req.body.password!==docs[0].password)
      {
        res.json({mssg:"Wrong password!", input:"password"});
      }
      else
      {
        sess.login=req.body.login;
        res.json({mssg:"OK C:", input:"none"});
      }
    }
  }).catch(err=>{
    res.json({mssg:"There is no user with that login!", input:"login",err});
  });

};

const checkIfExists = (req,res) =>{
  Account.find({login:req.body.login}).then(docs=>{
    if(docs.length===1)
    {
      res.json({exists:true});
    }
    else
    {
      res.json({exists:false});
    }
  })
}

const getSingleItem = (req, res)=>{
  Item.findById(req.body.id).then((docs)=>{
    res.json(docs);
  });
};

module.exports = {
  loaditems,
  checkLogIn,
  register,
  checkIfExists,
  logIn,
  getSingleItem
};
