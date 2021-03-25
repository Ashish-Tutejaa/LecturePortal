const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token : {type : String, required : true}
})

const tokenModel = mongoose.model('reftoken', tokenSchema);

module.exports = tokenModel;