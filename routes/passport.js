var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index');



// prepare our serialize functions
passport.serializeUser(function(user, done){
  //console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  //console.log("DESERIALIZED JUST RAN!");
  db.User.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){
      done(error, user);
    });
});

// Login Required middleware.

exports.isAuthenticated = function(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  }
  else {
   return next();
  }
};

exports.loggedIn = function(req, res, next) {
  if (req.user) {
    res.redirect('/login');
  }
  else {
    return next();
  }
};
