const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


router.get('/loaditems', apiController.loaditems);


module.exports = router;
