const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
var upload = multer();

//CONTROLLER
const authController = require('../controllers/authController.js');
//ROUTER
const router = express.Router();

// GET /auth/login PUBLIC
router.get("/login", (req,res)=>{ res.send("the login") })

//GET /auth/signup PUBLIC
router.post("/signup",upload.single('buffer'), authController.signup);

module.exports = router;