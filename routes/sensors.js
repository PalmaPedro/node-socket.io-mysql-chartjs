const router = require('express').Router();
const Sensor = require('../models/Sensor');
const User = require('../models/User.js');
//const users = require('./users.js');

// add routes 
router.post('/profile',  (req, res) => {
    const { serial } = req.body;   // comes from the profile page when the user inputs the serial of the device
    console.log(serial);
    const username = req.session.username;   // user that is logged in
    //console.log(username);
    if (serial) {
        try {
            Sensor.query().select('user_id').where({ 'serial_no': serial }).then(serialFound => { // checks db for the same serial number
                if (serialFound.length == 0) {
                    return res.redirect("/sensor?error");
                } else {
                    // 1) A serial number has been found. 
                    // 2) By default a sensor has no user connected (null).it's waiting for a user to login to the application and register the device
                    // 3) i need to fetch the id of the user logged in 
                    User.query().select('id').where({ 'username': username }).then(userFound => {
                        //console.log(userFound[0].id);
                        const userId = userFound[0].id;
                         // 4) update 'sensors' db table with the id of the user
                       Sensor.query().patch({ 'user_id':  userId }).then(dbUpdated => {  
                        return res.send({ response: "Device is registered!" });
                    });
                    });
                }
            });
        } catch (error) {
            return res.status(500).send({ response: "Something went wrong with the database." });
        }
    } else {
        return res.redirect("/sensor?error");
    }

    
});






module.exports = router;