const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../api/models/user');
const passport = require('passport');
const multer = require('multer');
var upload = multer();
// Connecting to Database

mongoose.connect("mongodb+srv://tuteja:tuteja123@mern.1ft2r.mongodb.net/MERN")


// GET /login

router.get("/login", (req,res)=>{
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


router.post("/signup",upload.single('buffer'), async (req, res, next) => {
    try {
        console.log(req.body);
        const {uname, pass } = req.body;
        let arrayBuffer = req.file.buffer.buffer;
	    let image = new Uint8Array(arrayBuffer);
        const username = uname;
        const user = new User({ image, username });
        console.log("registering");

        const registeredUser = await User.register(user, pass);
        console.log("registered");
        req.login(registeredUser, err => {
            if (err)
            {
                console.log(err);
            }
            // req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/login');
        })
    } catch (e) {
        // req.flash('error', e.message);
        console.log(res.status,e.message);
    }
});

module.exports = router;