const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    start : {type : Date, required : true},
    end : {type : Date, requried : true},
    src : {type : String, required : true},
    createdAt : {type : Date, default : Date.now, expires : 5400}
})

const lectureModel = mongoose.model('lecture', lectureSchema);

module.exports = lectureModel;