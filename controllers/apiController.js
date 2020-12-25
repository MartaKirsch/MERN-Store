const Item = require('../models/itemModel');
const Account = require('../models/accountModel');
const session = require('express-session');
const mongoose = require('mongoose');

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
        res.json({mssg:"OK C:", input:"none",login:req.body.login});
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


const makeAnOrder = (req, res)=>{

  let sess = req.session;

  //get the user
  Account.findOne({login: sess.login}).then(doc=>{

    doc.orders.push({
      //_id: mongoose.Types.ObjectID,
      _id: ""+(doc.orders.length+1),
      items: req.body.items,
      price: req.body.sum
    });

    //res.json(doc);

    doc.save().then(res=>{
      res.json({saved:true})
    }).catch(err=>{
      res.json(err)
    });

  })
};


const loadOrders = (req, res)=>{

  let sess = req.session;

  //get the user
  Account.findOne({login: sess.login}).then(doc=>{

    res.json(doc.orders.reverse());

  }).catch(err=>{
    res.json(err);
  });
};

module.exports = {
  loaditems,
  checkLogIn,
  register,
  checkIfExists,
  logIn,
  getSingleItem,
  makeAnOrder,
  loadOrders
};
