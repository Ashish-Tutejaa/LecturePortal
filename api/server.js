const express = require('express');
const port = 5000;
const app = express();

const CORS = (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*',
	});
	next();
};

app.use(express.json());
app.use(express.raw());

app.options('/getData', CORS);

app.post('/getData', CORS, (req, res) => {
	console.log(req.headers);
	console.log(req.body);
	console.log(typeof req.body);
	res.status(200).end();
});

app.listen(port, () => {
	console.log(`listening@${port}`);
});
