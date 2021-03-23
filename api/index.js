
require('dotenv').config();
require('./models');

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = process.env.LOCALPORT || 8000;
const childModel = require('./models/childModel.js');

//MIDDLEWARE
const {CORS, AUTH} = require('./middleware');



app.use(cookieParser());
app.use(express.json());
app.use(
	bodyParser.raw({
		limit: 824700,
	})
);

app.options('/*', CORS ,(req,res) => {
	res.end();
});

app.get('/improtected', AUTH, (req,res) => {
	console.log('inside');
	res.status(200).end();
})

app.use('/', CORS , require('./routers/index'));

app.listen(port, () => 
	console.log(`listening@${port}`));
