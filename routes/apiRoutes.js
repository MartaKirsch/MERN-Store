const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


router.get('/loaditems', apiController.loaditems);

router.get('/checkLogIn', apiController.checkLogIn);

router.post('/register', apiController.register);

router.post('/logIn', apiController.logIn);

router.post('/getSingleItem', apiController.getSingleItem);

router.post('/checkIfExists', apiController.checkIfExists);


module.exports = router;
