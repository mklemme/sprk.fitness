module.exports = {
  up: function(migration, DataTypes, done) {
    console.log("Running migration for users");
    // add altering commands here, calling 'done' when finished
    migration.createTable('Users',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      resetPasswordExpires:{
        type: DataTypes.DATE
      },
      resetPasswordToken: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      weight: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      workoutPublic: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    .complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished

    migration.dropTable('Users')
      .complete(done);
  }
};
