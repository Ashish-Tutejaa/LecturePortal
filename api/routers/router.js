const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../api/models/user');
const passport = require('passport');
const multer = require('multer');
var upload = multer();


//@route GET /home
//@desc Displays Home
 
router.get('/home', (req,res)=>{

    if(!req.isAuthenticated())
    {
        console.log("Login first");
        return res.send("Login First");
    }
    console.log("IN HOME")
    
    //Render HomePage Here


    res.status(200).end();
})
// router.get('/login',(req,res)=>{
//     res.send("Login again");
// })

// @route POST /login
// @desc log in a user
router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res) => {

    console.log("logged in");
    res.redirect('/home');
    // res.send('THIS IS HOME')
})


// @route POST /signup
// @desc signup a new user

router.post("/signup", upload.single('buffer'), async (req, res, next) => {
    try {
        
        // Creating new user 
        const { uname, pass } = req.body;
        let arrayBuffer = req.file.buffer.buffer;
        let id_image = new Uint8Array(arrayBuffer);
        const username = uname;
        const user = new User({ id_image, username });
        
        //Registering new user in Database
        const registeredUser = await User.register(user, pass);
        
        req.login(registeredUser, err => {
            if (err) {
                console.log(err);
            }
            
            // res.status(200).end();

            res.redirect("/home");
        })
    } catch (e) {
        
        console.log(res.status, e.message);
        res.redirect('/signup');
    }
});

module.exports = router;