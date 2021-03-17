const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const key = require('../../config.js')['OCIM_KEY'];
const ep = require('../../config.js')['END_POINT'];
const userModel = require('../models/user');

//MAKE ROUTER
const router = express.Router();

// MONGOOSE CONNECT
// mongoose.connect('mongodb+srv://tuteja:tuteja123@mern.1ft2r.mongodb.net/MERN', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
// 	console.log('DB_CONNECTED');
// });

router.get('/', async (req, res) => {

	let user = await userModel.find({username:"obama"});
	
	let buffer_view = new Uint8Array(user[0].id_image.data.buffer);

	if(buffer_view == user[0].id_image.data.buffer )
	{
		console.log("YES");
	}
	else
	{
		console.log("NO");
	}

	console.log(buffer_view,user[0].id_image.data.buffer);


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
