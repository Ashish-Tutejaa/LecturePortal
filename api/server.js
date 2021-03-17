const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const passport = require("passport");
const LocalStrategy = require('passport-local')
const router = require("./routers/router");
const User = require('./models/user');
const postImageRouter = require('./routers/postImage');
const session = require('express-session');
const mongoose = require('mongoose');

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
app.use(session(sessionConfig))

const CORS = (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*',
	});
	next();
};

// Middlewares for passportJs
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connecting to Database
mongoose.connect('mongodb+srv://tuteja:tuteja123@mern.1ft2r.mongodb.net/MERN', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.json());
app.use(
	bodyParser.raw({
		limit: 824700,
	})
);

app.use('/imageDetect',postImageRouter);
app.use("/",CORS,router);


app.listen(port, () => 
	console.log(`listening@${port}`));
