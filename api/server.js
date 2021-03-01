const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const postImageRouter = require('./routers/postImage');

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

//Data route
//access: private
//ep: /data
//method: POST
app.options('/data', CORS, (req, res) => {
	res.status(200).end();
});
app.use('/data', CORS, postImageRouter);

app.listen(port, () => {
	console.log(`listening@${port}`);
});
