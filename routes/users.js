const router = require('express').Router();
const User = require('../models/User.js');
const fs = require('fs');
const navbarPage = fs.readFileSync("./public/navbar.html", "utf8")
const profilePage = fs.readFileSync("./public/profile.html", "utf8")


// middleware to secure routes
const requireLogin = (req, res, next) => {
    if (req.session.loggedin) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/login"); 
    }
}

router.get('/current-user', requireLogin, (req, res) => {
    const { username } = req.session;
    User.query().findOne({ username }).then(userfound => {
       return  res.status(200).json(userfound);
   })
});

router.get('/profile', requireLogin, (req, res) => {
      return res.send(navbarPage + profilePage);
});


module.exports = router;