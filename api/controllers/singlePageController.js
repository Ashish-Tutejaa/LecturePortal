const home = async (req,res) => {
    console.log('HEREE', req.user);
    console.log(req.cookies);
    if(!req.isAuthenticated())
        {
        console.log("Login first");
        return res.status(401).end();
        }
    //Render HomePage Here
    res.status(200).end();
}

module.exports = {
    home
}