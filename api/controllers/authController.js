const studentModel = require('../models/student');

const isloggedin = async (req,res) => {
    if(req.user){
        res.status(200).json({loggedIn : true});
    } else {
        res.status(400).json({loggedIn : false});
    }
}

const signup = async (req,res) => {
    try {
        const {uname, pass } = req.body;
        let arrayBuffer = req.file.buffer.buffer;
	    let image = Buffer.from(new Uint8Array(arrayBuffer));
        const username = uname;
        console.log(image,username, pass);
        const student = new studentModel({ id_image: image, username });
        const registeredStudent = await studentModel.register(student, pass);
        console.log("registered"); 
        req.login(registeredStudent, err => {
            if (err)
                {
                console.log(err);
                res.status(500).json({err : "An internal server error occurred."});
                }
            else res.status(200).json({status : "Successfully Registered."});
        })
    } catch (e) {
        console.log(res.status,e.message);
        res.status(500).json({err : e.message});
    }
}

const login = async (req,res) => {
    console.log('Successfully logged in');
    console.log(req.user);
    res.set('Access-Control-Expose-Headers', 'Username');
    res.set('Username', req.user.username);
    res.status(200).send(Buffer.from(req.user.id_image));
}

const logout = async (req,res) => {
    try{
        req.logout();
        res.status(200).json({status : "Logged Out Successfully."});
    } catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

module.exports = {
    signup,
    login,
    logout,
}