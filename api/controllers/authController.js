const studentModel = require('../models/student');

const signup = async (req,res) => {
    try {
        const {uname, pass } = req.body;
        let arrayBuffer = req.file.buffer.buffer;
	    let image = Buffer.from(new Uint8Array(arrayBuffer));
        const username = uname;
        const student = new studentModel({ image, username });
        const registeredUser = await student.register(student, pass);
        console.log("registered");
        req.login(registeredUser, err => {
            if (err)
                {
                console.log(err);
                res.status(500).json({err : "An internal server error occurred."});
                }
            else res.redirect('/login');
        })
    } catch (e) {
        console.log(res.status,e.message);
        res.status(500).json({err : e.message});
    }
}

module.exports = {
    signup
}