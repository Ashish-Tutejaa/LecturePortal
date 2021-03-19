//CONFIGURE ENV VARIABLES
require('dotenv').config();

//EXPRESS SETUP
const express = require('express');
const app = express();
console.log(process.env);
//MONGO SETUP
// Connecting to Database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, () => {
	console.log('successfully connected to mongo');
})

//PASSPORT && SESSION
const passport = require("passport");
const LocalStrategy = require('passport-local')
const session = require('express-session');
const studentModel = require('./models/student.js');
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
// Middlewares for passportJs
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(studentModel.authenticate()));
passport.serializeUser(studentModel.serializeUser());
passport.deserializeUser(studentModel.deserializeUser());
//END

const axios = require('axios');
const bodyParser = require('body-parser');
const port = process.env.LOCALPORT || 8000;


const CORS = (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': 'Cookie, Content-Type',
		'Access-Control-Allow-Credentials' : 'true',
	});
	next();
};

app.use(express.json());
app.use(
	bodyParser.raw({
		limit: 824700,
	})
);

app.options('/*', CORS ,(req,res) => {
	res.end();
});
app.use('/', CORS , require('./routers/index'));

app.listen(port, () => 
	console.log(`listening@${port}`));
