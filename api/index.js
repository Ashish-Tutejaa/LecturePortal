//CONFIGURE ENV VARIABLES
require('dotenv').config();

//EXPRESS SETUP
const express = require('express');
const app = express();

//MONGO SETUP
// Connecting to Database
mongoose.connect(process.env.DB_URI, () => {
	console.log('successfully connected to mongo');
})

const axios = require('axios');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;


const CORS = (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*',
	});
	next();
};

app.use(express.json());
app.use(
	bodyParser.raw({
		limit: 824700,
	})
);

app.options('/', CORS);
app.use('/', CORS, require('./routers/index'));

app.listen(port, () => 
	console.log(`listening@${port}`));
