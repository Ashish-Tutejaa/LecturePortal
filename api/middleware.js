const jwt = require('jsonwebtoken');

const CORS = (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': 'Cookie, Content-Type, Authorization',
		'Access-Control-Allow-Credentials' : 'true',
	});
	next();
};

const gen_token = (user, type) => {
    let token = jwt.sign({
        id : user.id,
    }, process.env[`${type}_SECRET`],{
        expiresIn : type === 'REFRESH' ? '24h' : '10m'
    })
    return token;
}

 const AUTH = (req,res,next) => {
    console.log('IN AUTH');
    let token = req.get('Authorization');
    console.log(token);
    if(!token)
        return res.status(400).json({redirect : "No token found"});
    token = token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err,decoded) => {
        if(err)
            return res.status(400).json({redirect : "Invalid token"});
        req.user = decoded;
        console.log('OUT AUTH');
        next();
    })
    //token is present and verified
}

module.exports = {
    CORS, 
    gen_token,
    AUTH
}