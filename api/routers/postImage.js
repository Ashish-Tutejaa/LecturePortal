const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const key = require('../config.js')['OCIM_KEY'];
const ep = require('../config.js')['END_POINT'];
const Person = require('../models/user');
const multer = require('multer');
var upload = multer();

//MAKE ROUTER
const router = express.Router();

//MONGOOSE CONNECT
mongoose.connect('mongodb+srv://tuteja:tuteja123@mern.1ft2r.mongodb.net/MERN', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('DB_CONNECTED');
});

router.post('/', upload.single('buffer'), (req, res) => {
	console.log(req.body.uname, req.body.pass);
	console.log(req.file);

	console.log(req.file.buffer.buffer);
	let arrayBuffer = req.file.buffer.buffer;
	let u8arr = new Uint8Array(arrayBuffer);
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
