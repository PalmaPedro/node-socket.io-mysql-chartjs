const router = require('express').Router();
const User = require('../models/User.js');
const Sensor = require('../models/Sensor');
const users = require('../routes/users.js');

// add routes 
router.post('/profile', (req, res) => {

});

router.get('/profile', requireLogin, (req, res) => {

});

