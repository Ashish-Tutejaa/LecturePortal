const studentModel = require('../models/childModel.js');

const get = async (req,res) => {
    try{
        const {username} = req.body;
        let student = await studentModel.findOne({username});
        if(student){
            res.status(200).json({image : student.id_image});
        }  else {
            res.status(404).json({err : "No User with such username found."});
        }
    } catch(err){
        res.status(500).json({err});
    }
}

const detect = async (req, res) => {
	try{
		let buffer = req.body;
		const OCP_KEY = process.env.OCIM_KEY;
		const END_POINT = process.env.END_POINT;
		axios({
			method: 'POST',
			url: END_POINT,
			data: buffer,
			headers: {
				'Ocp-Apim-Subscription-Key': OCP_KEY,
				'Content-type': 'application/octet-stream',
			},
		})
			.then(res1 => {
				console.log('RES');
				console.log(res1.data);
				res.status(200).json({response : res1.data});
			})
			.catch(err1 => {
				console.log('ERR');
				console.log(err1);
				res.status(500).json({err : "An internal server error occurred."});
			});
	} catch(err){
		res.status(500).json({err});
	}

}

module.exports = {
    detect,
    get
}