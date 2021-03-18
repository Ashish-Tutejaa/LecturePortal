const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const studentSchema = new mongoose.Schema({
	id_image: { type: 'Buffer',required:true },
});


studentSchema.plugin(passportLocalMongoose);
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
