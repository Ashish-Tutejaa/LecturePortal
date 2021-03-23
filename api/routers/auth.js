const express = require('express');
const multer = require('multer');
const {AUTH} = require('../middleware');
var upload = multer();

//CONTROLLER
const authController = require('../controllers/authController.js');
//ROUTER
const router = express.Router();

//POST /auth/signup PUBLIC
router.post('/signup',upload.single('buffer'), authController.signup);

//POST  /auth/login PUBLIC
router.post('/signin', authController.signin)

//GET /auth/logout PUBLIC
router.get('/signout', authController.signout);

//GET /auth/isloggedin PRIVATE
router.get('/userinfo', AUTH, authController.userinfo);

//GET /auth/refresh PUBLIC
router.get('/refresh', authController.refresh)

module.exports = router;