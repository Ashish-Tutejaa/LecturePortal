const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const userModel = require('../models/childModel');

//CONTROLLER
const imageController = require('../controllers/imageController.js');
//ROUTER
const router = express.Router();

//POST /image/detect PROTECTED 
router.post('/detect', imageController.detect);

//GET /image/getUserImage PROTECTED
router.get('/getUserImage', imageController.get);


module.exports = router;
