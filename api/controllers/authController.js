const childModel = require('../models/childModel');
const tokenModel = require('../models/tokenModel');
const {gen_token} = require('../middleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");
// const JSON = require("json");
const userinfo = async (req,res) => {
    console.log(req.user);
    console.log(req.cookies);
    if(req.user){
        res.status(200).json({loggedIn : req.user});
    } else {
        res.status(401).json({err : "no such user found"});
    }
}

const signup = async (req,res) => {
    try{
        let user = await childModel.findOne({username : req.body.username});
        if(user){
            res.status(409).json({err : "Username is taken"});
            return;
        }
        let userObject = {
            username : req.body.username,
            password : req.body.password,
            image : Buffer.from(new Uint8Array(req.file.buffer.buffer))
        }
        let tc = new childModel(userObject);
        let ans = await tc.save();
        res.status(200).json({status : 'success'});
    } catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

const signin = async (req,res) => {
    try{
        let user = await childModel.findOne({username : req.body.username});
        if(!user)
            return res.status(400).json({err : "No such user found"});

        console.log(req.body.password, user);
        let validate = await bcrypt.compare(req.body.password,user.password);
        console.log(validate);
        if(!validate)
            return res.status(401).json({err : "Bad password or username"});

        //this user is good make access and refresh tokens and send back
        let accessToken = gen_token(user,'ACCESS');
        let refreshToken = gen_token(user, 'REFRESH');

        console.log(accessToken, refreshToken);

        let tempToken = new tokenModel({token : refreshToken});
        await tempToken.save();
        
        //Saving FaceId Cookie Daily During Signin
        const data = user.image;
        // console.log(user.image);
        const imageDetectResponse = await fetch('http://localhost:8000/image/detect',
         {  method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body:data,
        }).then((res)=>{
            return res.json();
        }).catch((err)=>{
            console.log(err);

        });

        const faceId  = imageDetectResponse.response[0].faceId;
        res.cookie('faceId',faceId,{
            httpOnly : true,
            path : '/',
            maxAge : 86400 * 1000,
        });

        res.cookie('rid',refreshToken,{
            httpOnly : true,
            path : '/',
            maxAge : 86400 * 1000,
        });

        
        res.status(200).json({token : accessToken});
    } catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

const signout = async (req,res) => {
    try{
        let rtoken = req.cookies['rid'];
        console.log(req.headers);
        console.log(req.cookies);
        if(!rtoken)
            return res.status(400).json({err : "No token found"});
        //find refresh token
        let token = await tokenModel.findOne({token : rtoken});
        if(!token)
            return res.status(400).json({err : "No token found"});
        
        tokenModel.findOneAndDelete({token : rtoken}, function(err, _){
            if(err)
                return res.status(500).json({err});
                
            res.cookie('rid', '', {
                httpOnly : true,
                path : '/',
                exprires : 'expires=Thu, 01 Jan 1970 00:00:00 GMT',
            })
            res.status(200).json({status : "deleted"});
        })
    } catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

const refresh = async (req,res) => {
    
    //check if refresh token is in db, if not fail
    //check if refresh token is valid, if not fail
    //else generate a new access token
    let rtoken = req.cookies['rid'];
    console.log(req.cookies);
    try{
        if(!rtoken)
            throw new Error('No token found');

        let token = await tokenModel.findOne({token : rtoken});
        if(!token)
           throw new Error('No token found');
        
        let validated = jwt.verify(token.token, process.env.REFRESH_SECRET);

        let newAccessToken = gen_token({id : validated.id},'ACCESS');
        res.status(200).json({token : newAccessToken});

    }catch(err){
        // console.log(err.name, err.message);
        console.log(err);
        if(err.name === 'TokenExpiredError'){
            //delete from db
            tokenModel.findOneAndDelete({token : rtoken}, function(dberr,_dbres){
                if(dberr)
                    return res.status(500).json(dberr);
                else 
                    return res.status(400).json({err : "Invalid token"});
            })
        } else if(err.message === 'No token found'){
            res.status(400).json({err});
        } else
            res.status(500).json({err});
    } 

} 

module.exports = {
    signup,
    signin,
    signout,
    userinfo,
    refresh
}