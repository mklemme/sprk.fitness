"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Workouts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      globalid: {
        type: DataTypes.STRING
      },
      UserId:{
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      day: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Workouts").done(done);
  }
};
