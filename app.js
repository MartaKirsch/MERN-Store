const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

const port = 5000;

app.listen(port,()=>{console.log('Listening to port: '+port);});

//connect to the database
mongoose.connect("mongodb+srv://pandeu:mernshop@cluster0.oe60k.mongodb.net/shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));


//This snipped from the code above helps handle CORS related issues that you might face when trying to access the api from different domains during development and testing:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use('/api',apiRoutes);


//404
app.use((req,res)=>{
  res.send('An error occured');
});
