var hat = require('hat');
var rack = hat.rack();
var passport = require('passport');
var db = require("../models/index");


// ==========
//
// USER'S ROUTES
//
// ==========

exports.new = function(req, res) {
  res.render("workouts/new", {
    title: "Add new workout",
    user: req.user
  })
};


exports.newAction = function(req, res) {
  db.Workout.create({
    globalid: rack(),
    name: req.body.name,
    days: req.body.days,
    UserId: req.user.id
  }).done(function(err, workout){
    res.redirect("/my/workout/"+ workout.id);
  })
};

exports.singlePublic = function(req, res) {
  db.Workout.find({
    where: {
      globalid: req.params.id
    }
  }).done(function(err, workout){
    res.render("workouts/single", {
      workout: workout
    })
  })
};

exports.single = function(req, res) {
  db.Workout.find({
    where: {
      id: req.params.id
    }
  }).done(function(err, workout){
    res.render("workouts/single", {
      workout: workout
    })
  })
};
