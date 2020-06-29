const router = require('express').Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const saltRounds = 12;

const fs = require('fs');
const navbarPage = fs.readFileSync("./public/navbar.html", "utf8")
const signupPage = fs.readFileSync("./public/signup.html", "utf8");
const loginPage = fs.readFileSync("./public/login.html", "utf8");

// add middleware to redirect user to home page if login or signup forms are requested while in a session
const goHome = (req, res, next) => {
    if (req.session.loggedin) {
       return res.redirect("/"); 
      } else {
        next();
      }
}

// authentication routes
router.get('/login', goHome, (req, res) => {
    return res.send(navbarPage + loginPage);
});

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    if (username && password) {
        try {
            User.query().select('username').where({ 'username': username }).then( async userFound => {
                if (userFound.length == 0) {
                    return res.redirect("/login?error");
                } else {
                    const matchingPassword = await User.query().select('password').where({ 'username': username }).limit(1);
                    const passwordToValidate = matchingPassword[0].password;

                    bcrypt.compare(password, passwordToValidate).then((result) => {
                        if (result) {
                            req.session.loggedin = true;
                            req.session.username = username;
                            return res.redirect("/profile");
                        } else {
                            return res.redirect("login?error");
                        }
                    });
                }
            });
        } catch (error) {
            return res.redirect("/login?error");
        }
    } else {
        return res.redirect("/login?error");
    }
});

router.get('/signup', goHome, (req, res) => {
    return res.send(navbarPage + signupPage);
});

router.post('/signup', (req, res) => {
    const { username, password, passwordRepeat, email } = req.body;

    const isPasswordTheSame = password === passwordRepeat;
     // validate data
    if (username && password && isPasswordTheSame) {
        // password and email validation
        if (password.length < 8) {
            return res.status(400).send({ response: 'Password must be 8 characters or longer' });
        } else {
            // check if user already exists in db
            try {
                User.query().where('username', username).select('username', 'password').then(foundUser => {
                    // if exists, send response
                    if (foundUser.length > 0) {
                        return res.status(400).send({ response: 'User already exists!' });
                    } else {
                        bcrypt.hash(password, saltRounds).then(hashedPassword => {
                            User.query().insert({ username, password: hashedPassword, email }).then(createdUser => {
                              //return res.send({ response: `The user ${createdUser.username} was created` });
                              return res.redirect("/login");
                            });
                          });
                    }
                });
            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the database." });
            }
        }
    }
});

router.get('/logout', (req, res) => {
    // Destroy session data
    req.session.destroy();
    //Redirect to login page
    res.redirect('/');
  });

module.exports = router;