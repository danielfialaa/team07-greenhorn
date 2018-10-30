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
    task_history.hasOne(attachment);
    task_history.hasOne(task);
    task_history.hasOne(users {
      as: 'idRequestor'
    });
    task_history.hasOne(users {
      as: 'idCompletor'
    });
    task_history.hasOne(users {
      as: 'idUser'
    });
  };
  return task_history;
};
