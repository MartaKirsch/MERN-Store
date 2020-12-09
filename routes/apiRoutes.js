const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


router.get('/loaditems', apiController.loaditems);

router.get('/checkLogIn', apiController.checkLogIn);

router.post('/register', apiController.register);


module.exports = router;
