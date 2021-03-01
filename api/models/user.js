const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user_name: { type: String, required: true },
	password: { type: String, required: true },
	id_image: { type: 'Buffer' },
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
