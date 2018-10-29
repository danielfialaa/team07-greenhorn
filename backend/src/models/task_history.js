'use strict';
module.exports = (sequelize, DataTypes) => {
  const task_history = sequelize.define('task_history', {
    dateOfAssignment: DataTypes.DATE,
    dateOfCompletion: DataTypes.DATE,
    dateOfNotification: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  task_history.associate = function(models) {
    // associations can be defined here
  };
  return task_history;
};
