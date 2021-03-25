const express = require('express');
const {AUTH} = require('../middleware');

//CONTROLLER
const singlePageController = require('../controllers/singlePageController.js');
//ROUTER
const router = express.Router();

//HOME PAGE:
console.log('LONELY SINGLES IN YOUR AREA>');
router.get('/current-lecture', AUTH, (req,res,next) => {
    console.log(req.headers);
    console.log(`in ${req.baseUrl}, going to ${req.originalUrl}`);
    next(); 
}, singlePageController.currentLecture);

router.post('/make-lecture', AUTH, (req,res,next) => {
    console.log(req.headers);
    console.log(`in ${req.baseUrl}, going to ${req.originalUrl}`);
    next(); 
}, singlePageController.makeLecture);


module.exports = router;
