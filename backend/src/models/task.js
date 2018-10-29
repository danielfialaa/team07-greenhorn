'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  task.associate = function(models) {
    // associations can be defined here
  };
  return task;
};