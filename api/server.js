const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();

const router = require("./routers/router");

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


app.use("/",CORS,router);

app.options('/getData', CORS);






// app.post
// (
// 	'/getData', CORS, (req, res) => {
// 	console.log(req.headers);
// 	console.log(x.byteLength);
// 	let sendingData = new Uint8Array(req.body);
// 	axios
// 	(  {
// 		method: 'POST',
// 		url: ep,
// 		data: sendingData,
// 		headers: {
// 			'Ocp-Apim-Subscription-Key': key,
// 			'Content-type': 'application/octet-stream',
// 		},
// 	})
// 		.then(
// 			res => {
// 			console.log('RES');
// 			console.log(res.data);
// 		})
// 		.catch(err => {
// 			console.log('ERR');
// 			console.log(err);
// 		});
// );
// // =======
// //Data route
// //access: private
// //ep: /data
// //method: POST
// app.options('/data', CORS, (req, res) => {
// 	res.status(200).end();
// });
// app.use('/data', CORS, postImageRouter);

app.listen(port, () => 
	console.log(`listening@${port}`));
