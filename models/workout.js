"use strict";

module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define("Workout", {
    name: DataTypes.STRING,
    day: DataTypes.STRING,
    globalid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Workout.belongsTo(models.User);
        Workout.hasMany(models.Exercise);
      }
    }
  });

  return Workout;
};
