"use strict";

module.exports = function(sequelize, DataTypes) {
  var Exercise = sequelize.define("Exercise", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Exercises.belongsTo(models.Workout);
      }
    }
  });

  return Exercise;
};
