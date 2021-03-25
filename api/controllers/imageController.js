const studentModel = require('../models/childModel.js');
const axios = require('axios');
const fetch = require("node-fetch");
const OCP_KEY = process.env.OCIM_KEY;
const END_POINT = process.env.END_POINT;

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
		console.log(err);
		res.status(500).json({err});
	}

}

const verify = async (req,res)=>{

	try{
		const faceId1 = req.cookies['faceId'];

		let user = await studentModel.findOne({username : req.body.username});
		const data = user.image; //req.file
		
		let rececntFaceId =   await fetch('http://localhost:8000/image/detect',
			{  method: 'POST',
				headers: {
					'Content-Type': 'application/octet-stream'
				},
				body:data,
			}).then((res)=>{
				
				return res.json();
			}).catch((err)=>{
				console.log(err);

			});
		
		faceId2 = rececntFaceId.response[0].faceId;

		const endpoint = 'eastus.api.cognitive.microsoft.com'; 
		const ifMatched = await axios.post(
			`https://${endpoint}/face/v1.0/verify`,{
              faceId1,
              faceId2
            }, { 
            headers:{
                'Ocp-Apim-Subscription-Key':OCP_KEY,
                'Content-type':'application/json',
            },  
            }
			).then(res1 => {
				console.log('RES');
				console.log(res1);
				return res1;
			})
			.catch(err1 => {
				throw(err1);
				
			});
            
		
		if(ifMatched.data.isIdentical)
		{
			res.status(200).json({success:true});
		} 
		else
		{
			res.status(200).json({success:false});
		}
	}catch(err)
	{
		console.log(err.code,err.message);
		res.send(err);
	}
	

}

module.exports = {
    detect,
    get,
	verify
}