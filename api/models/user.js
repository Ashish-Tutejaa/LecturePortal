const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user_name: { type: String, required: true },
	password: { type: String, required: true },
	id_image: { type: 'Buffer' },
});

const Person = mongoose.model('Person', userSchema);

module.exports = Person;
