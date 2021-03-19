const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
var upload = multer();

//CONTROLLER
const authController = require('../controllers/authController.js');
//ROUTER
const router = express.Router();

//POST /auth/signup PUBLIC
router.post('/signup',upload.single('buffer'), authController.signup);

//POST  /auth/login PUBLIC
router.post('/login', passport.authenticate('local'), authController.login)

//GET /auth/logout PUBLIC
router.get('/logout', authController.logout);

module.exports = router;