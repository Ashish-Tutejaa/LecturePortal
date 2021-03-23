const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const userModel = require('../models/childModel');
const passport = require('passport');

//CONTROLLER
const singlePageController = require('../controllers/singlePageController.js');
//ROUTER
const router = express.Router();

//HOME PAGE:
console.log('LONELY SINGLES IN YOUR AREA>');
router.get('/home',(req,res,next) => {
    console.log(req.headers);
    console.log(`in ${req.baseUrl}, going to ${req.originalUrl}`);
    next(); 
}, singlePageController.home);


module.exports = router;
