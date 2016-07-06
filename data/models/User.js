'use strict';
var Stage = require('./Stage')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    currentStage: DataTypes.INTEGER,
    exitStage: DataTypes.INTEGER,
    chances: DataTypes.INTEGER,
    rejectionSent: DataTypes.INTEGER
  },
  {
    timestamps: false,
    tableName: 'users'
  });
  return User;
};