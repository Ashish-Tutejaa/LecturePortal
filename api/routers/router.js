const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../../api/models/user');

// Connecting to Database

mongoose.connect("mongodb+srv://tuteja:tuteja123@mern.1ft2r.mongodb.net/MERN")


// GET /login

router.get("/login",(req,res)=>{
    // const {username,password} = req.params;

    // //Authenticate
    // // if()
    // const newUser = new user({
    //     user_name:"joban",
    //     password:"Joban@12345"
    // });

    // // newUser.save();
    // user.find({},(err,docs)=>console.log(docs))

    res.send("the login")
})




module.exports = router;