



// middleware to secure routes
const requireRegisterDevice = (req, res, next) => {
    if (req.session.loggedin) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/login"); 
    }
}

