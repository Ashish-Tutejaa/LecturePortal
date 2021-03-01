const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const key = require('../config.js')['OCIM_KEY'];
const ep = require('../config.js')['END_POINT'];
const userModel = require('../models/user');

//MAKE ROUTER
const router = express.Router();

//MONGOOSE CONNECT
mongoose.connect('mongodb+srv://tuteja:tuteja123@mern.1ft2r.mongodb.net/MERN', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('DB_CONNECTED');
});

router.post('/', (req, res) => {
	let buffer = req.body;
	let buffer_view = new Uint8Array(buffer);
	console.log(req.headers);
	console.log(buffer.byteLength);
	console.log(req.query);
	// axios({
	// 	method: 'POST',
	// 	url: ep,
	// 	data: buffer_view,
	// 	headers: {
	// 		'Ocp-Apim-Subscription-Key': key,
	// 		'Content-type': 'application/octet-stream',
	// 	},
	// })
	// 	.then(res1 => {
	// 		console.log('RES');
	// 		console.log(res1.data);
	// 	})
	// 	.catch(err1 => {
	// 		console.log('ERR');
	// 		console.log(err1);
	// 	});

	res.status(200).end();
});

module.exports = router;
