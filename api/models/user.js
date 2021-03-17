const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	
	id_image: { contentType: 'string',data:"buffer" },
});


userSchema.plugin(passportLocalMongoose);
const Person = mongoose.model('Student', userSchema);

module.exports = Person;
