const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


router.get('/loaditems', apiController.loaditems);

router.get('/checkLogIn', apiController.checkLogIn);

router.get('/loadOrders', apiController.loadOrders);

router.get('/getOrder/:id',apiController.getOrder);

router.get('/logout', apiController.logout);

router.get('/loadAddresses',apiController.loadAddresses);

router.get('/getAddress/:id',apiController.getAddress);

router.get('/deleteAddress/:id',apiController.deleteAddress);

router.post('/updateAddress/:id',apiController.updateAddress);

router.post('/register', apiController.register);

router.post('/logIn', apiController.logIn);

router.post('/getSingleItem', apiController.getSingleItem);

router.post('/checkIfExists', apiController.checkIfExists);

router.post('/makeAnOrder', apiController.makeAnOrder);

router.post('/addAddress', apiController.addAddress);

router.post('/loadItemsFromOrder',apiController.loadItemsFromOrder);


module.exports = router;
