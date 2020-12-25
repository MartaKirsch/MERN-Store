const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


router.get('/loaditems', apiController.loaditems);

router.get('/checkLogIn', apiController.checkLogIn);

router.get('/loadOrders', apiController.loadOrders);

router.get('/logout', apiController.logout);

router.post('/register', apiController.register);

router.post('/logIn', apiController.logIn);

router.post('/getSingleItem', apiController.getSingleItem);

router.post('/checkIfExists', apiController.checkIfExists);

router.post('/makeAnOrder', apiController.makeAnOrder);


module.exports = router;
