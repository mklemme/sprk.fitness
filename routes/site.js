var passport = require('passport');
var User = require('../models/user');
var db = require("../models/index");

exports.index = function(req, res) {
  res.render("global/index", {
    title: "Home",
    user: req.user
  })
};

exports.about = function(req, res) {
  res.render("global/about", {
    title: "Sprk is",
    user: req.user
  })
};

exports.features = function(req, res) {
  res.render("global/features", {
    title: "Home",
    user: req.user
  })
};

exports.featuresStyle = function(req, res) {
  res.render("global/featuresStyle", {
    title: "Home",
    user: req.user
  })
};

exports.contact = function(req, res) {
  res.render("global/contact", {
    title: "Home",
    user: req.user
  })
};

exports.login = function(req, res) {
  if(req.user){
    res.redirect('/my/dashboard', {
      title: "Home",
      user: req.user
    })
  }
  else{
    res.render("account/login", {
      title: "Home",
      user: req.user
    })
  }
};

exports.loginAction = passport.authenticate('local', {
  successRedirect: '/my/dashboard',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


exports.signup = function(req, res) {
  if(req.user){
    res.redirect("/my/dashboard", {
      title: "Home"
    })
  }
  else{
    res.render("account/signup", {
      title: "Home"
    })
  }
};

exports.signupAction = function(req, res) {
  db.User.createNewUser(req.body.username, req.body.password, req.body.email,
    function(err){
      res.render("account/signup", {message: err.message, username: req.body.username});
    },
    function(success){
      res.redirect("/my/dashboard", {message: success.message});
  });
};
