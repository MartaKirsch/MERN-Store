const Item = require('../models/itemModel');
const Account = require('../models/accountModel');
const Address = require('../models/addressModel');
const Order = require('../models/orderModel');
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
    Account.findOne({login:sess.login}).then(doc=>{

      res.json({logged:true, account:doc});
    })
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

    let order = new Order({
    items: req.body.items,
    price: req.body.sum
    });

    order.save().then(newOrder=>{

      doc.orders.push(newOrder._id);

      doc.save().then(blob=>{
        res.json({saved:true})
      }).catch(err=>{
        res.json(err)
      });
    })

  });
};


const loadOrders = async (req, res)=>{

  let sess = req.session;

  //get the user
  Account.findOne({login: sess.login}).then(doc=>{

    let orders = [];

    for (let i = 0; i < doc.orders.length; i++) {
      Order.findById(doc.orders[i]).then(ord=>{
        orders.push(ord);
        if(doc.orders.length===orders.length)
        {
          res.json(orders.reverse());
        }
      })
    }

    // const promises = doc.orders.map.map(async id => {
    //   // request details from GitHub’s API with Axios
    //   const response = await Order.findById(id);
    //
    //   return response;
    // })
    //
    // // wait until all promises resolve
    // const orders = await Promise.all(promises)


  }).catch(err=>{
    res.json(err);
  });
};


const logout = (req,res)=>{
  let sess = req.session;

  req.session.login = null;
  res.json({success:true});
};


const addAddress = (req,res)=>{
  let sess=req.session;
  let address = new Address({...req.body, user:sess.login});

  address.save().then(doc=>res.json(doc)).catch(err=>console.log(err));
};


const loadAddresses = (req,res)=>{
  let sess=req.session;
  Address.find({user:sess.login})
  .then(docs=>res.json(docs))
  .catch(err=>console.log(err));
};


const getAddress = (req,res)=>{
  Address.findById(req.params.id).then(doc=>{
    res.json(doc);
  })
  .catch(err=>{
    console.log(err);
    res.sendStatus(404);
    //res.json({statusText:"NOT_OK"});
  });
};

const updateAddress = (req,res)=>{
  Address.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).then(doc=>{
    res.json(doc);
  })
  .catch(err=>console.log(err));
};

const deleteAddress = (req,res)=>{
  Address.findOneAndDelete({_id:req.params.id}).then(doc=>{
    res.json(doc);
  })
  .catch(err=>console.log(err));
};

module.exports = {
  loaditems,
  checkLogIn,
  register,
  checkIfExists,
  logIn,
  getSingleItem,
  makeAnOrder,
  loadOrders,
  logout,
  addAddress,
  loadAddresses,
  getAddress,
  updateAddress,
  deleteAddress
};
