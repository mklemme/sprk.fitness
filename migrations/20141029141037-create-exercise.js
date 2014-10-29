"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Exercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      WorkoutID: {
        type: DataTypes.INTEGER
      },
      sets:{
        type: DataTypes.ARRAY(DataTypes.TEXT)
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
    migration.dropTable("Exercises").done(done);
  }
};
