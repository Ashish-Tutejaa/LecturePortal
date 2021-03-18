const Router = require('express').Router();

const seeMe = (uid) => {

    return (req,res,next) => {
        console.log(`@${uid}: in ${req.baseUrl}, going to ${req.originalUrl} with method ${req.method}`);
        next();
    }
}

Router.use('/auth', seeMe(1),require('./auth.js'));
Router.use('/image', seeMe(2),require('./image.js'));
Router.use('/api', seeMe(3), require('./singlePages.js'));

module.exports = Router;