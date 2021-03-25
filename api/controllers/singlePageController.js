const lectureModel = require('../models/lectureModel');
//start, end, src, createdAt

const makeLecture = async (req,res) => {
    try{
        let {sdt, edt, url} = req.body;
        let tempLecture = new lectureModel({
            start : new Date(sdt),
            end : new Date(edt),
            src : url,
            createdAt : new Date(sdt),
        })
        await tempLecture.save();
        res.status(200).end();
    } catch(err){
        console.log(err);
        res.status(500).end();
    }
}

const currentLecture = async (req,res) => {
    try{
        //get latest lecture
        let lectures = await lectureModel.find().sort({ createdAt : 'ascending'});
        console.log(lectures);
        res.status(200).json({lecture : lectures[0]});
    } catch (err){
        console.log(err);
        res.status(500).json({err});
    }
}

module.exports = {
    makeLecture,
    currentLecture
}