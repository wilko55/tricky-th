'use strict';

module.exports = function(sequelize, DataTypes) {
  var Stage = sequelize.define('Stage', {
    stage: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    chances: DataTypes.INTEGER
  },
  {
    timestamps: false,
    tableName: 'stages'
  },
  {
    classMethods: {
      associate: function(models) {
        Stage.belongsTo(models.User, {
          foreignKey: 'currentStage', 
          targetKey: 'stage'
        })
      }
    }
  });
  return Stage;

};