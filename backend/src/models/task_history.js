'use strict';
module.exports = (sequelize, DataTypes) => {
  const task_history = sequelize.define('task_history', {
    dateOfAssignment: DataTypes.DATE,
    dateOfCompletion: DataTypes.DATE,
    dateOfNotification: DataTypes.DATE,
    dateOfDeadline: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  task_history.associate = function(models) {
    task_history.belongsTo(models.users, {
      foreignKey: 'idUser',
    });
    task_history.belongsTo(models.users, {
      foreignKey: 'idRequestor',
    });
    task_history.belongsTo(models.users, {
      foreignKey: 'idReporter',
    });
    task_history.belongsTo(models.tasks, {
      foreignKey: 'idTask'
    });
    task_history.hasMany(models.attachments, {
      foreignKey: 'idAssignedTask'
    });
  };
  return task_history;
};
