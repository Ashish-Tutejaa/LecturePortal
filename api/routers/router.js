const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// GET /login

router.get("/login",(req,res)=>{
    const {username,password} = req.params;

    //Authenticate
    if()

})




module.exports = router;