const router = require('express').Router();
const User = require('../models/User.js');
const Data = require('../models/Data');



// middleware to secure routes
const requireRegisterDevice = (req, res, next) => {
    if (req.session.loggedin) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/profile"); 
    }
}



module.exports = router;