const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	
	id_image: { type: 'Buffer',required:true },
});


userSchema.plugin(passportLocalMongoose);
const Person = mongoose.model('Student', userSchema);

module.exports = Person;
