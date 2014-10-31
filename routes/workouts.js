var hat = require('hat');
var rack = hat.rack();
var passport = require('passport');
var db = require("../models/index");
var bodyParser = require("body-parser");
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
  var exerciseDataRaw = req.body.exerciseInfo;
  var user = req.user;
  var name = req.body.name;
  console.log("Starting the engine");
  // res.render("workouts/new");
  db.Workout.create({
    globalid: rack(),
    name: req.body.workout.name,
    UserId: req.user.id,
  }).done(function(err, workout){
    console.log("finished creating the workout");
    user.addWorkout(workout).done(function(){
      console.log("creating the exercises instance");
      createExercises(workout);
    })
  })


  var createExercises = function(workout){
    var exerciseData = [];
    for (var key in exerciseDataRaw){
      var obj = exerciseDataRaw[key];
      obj.sets = JSON.stringify(obj.set)
      obj.WorkoutId = workout.id;
      exerciseData.push(obj)
    }
    console.log(workout);
    //use req.body.sets to populate an array of objects by looping with for key in object
    //turn obj.set = JSON.stringify();
    db.Exercise.bulkCreate(exerciseData).done(function(err, exercises) { // Notice: There are no arguments here, as of right now you'll have to...
      res.redirect("/workout/"+workout.globalid)
    });
  }
}
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
      globalid: req.params.id
    }
  }).done(function(err, workout){
    workout.getExercises().done(function(err, exercises, workout){
      res.render("workouts/single",{
        workout: workout,
        exercise: exercises,
        title: "Workout info for: "+workout.name
      })
    })
  })
};
