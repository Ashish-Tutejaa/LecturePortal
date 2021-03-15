const Router = require('express').Router();

Router.use('/auth',require('./auth.js'));
Router.use('/image',require('./image.js'));