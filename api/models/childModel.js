const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const childSchema = new mongoose.Schema({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true},
	image : {type : 'Buffer', required : true}
})

childSchema.pre('save', async function(next){
    console.log('hashing password')
    let hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
})

const childModel = mongoose.model('child', childSchema);

module.exports = childModel;