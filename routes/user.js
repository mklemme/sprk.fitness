var async = require('async');
var passport = require('passport');
var User = require('../models/user');
var db = require("../models/index");

// ==========
//
// USER'S ROUTES
//
// ==========

exports.account = function(req, res) {
  res.render('account/dashboard', {
    title: "Home",
    user: req.user
  });
};


exports.forgot = function(req, res) {
  res.render('account/forgot', {
    title: 'Forgot my password',
    user: req.user
  });
};

exports.workouts = function(req, res) {
  var user = req.user
  user.getWorkouts().done(function(error, workouts){
    res.render("workouts/my", {
      title: "My workouts",
      workouts: workouts
    })
  })

};



// exports.forgotAction = function(req, res){
//
//   function(crypto.randomBytes(20, function(err, buf){
//
//   }))
//
//
//   findUser(function(token){
//     db.User.find({
//       where: {
//         email: req.body.email
//       }
//     }).done(function(err, user){
//       if(!user){
//         console.log("Didnt find a user");
//         return res.redirect("/forgot?=no-username");
//       }
//     })
//
//     console.log("found user");
//     // return user;
//
//   });
// };
