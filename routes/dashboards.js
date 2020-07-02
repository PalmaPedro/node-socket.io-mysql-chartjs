const router = require('express').Router();
const User = require('../models/User.js');
const Data = require('../models/Data');

const fs = require('fs');
const navbarPage = fs.readFileSync("./public/navbar.html", "utf8");
const dashboardPage = fs.readFileSync("./public/dashboard.html", "utf8");

// middleware to secure routes
const requireLogin = (req, res, next) => {
    if (req.session.loggedin) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/login"); 
    }
}

router.get('/dashboard', requireLogin, (req, res) => {
    return res.send(navbarPage + dashboardPage);
});

module.exports = router;