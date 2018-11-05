'use strict';
module.exports = (sequelize, DataTypes) => {
  const task_history = sequelize.define('task_history', {
    idAssignedTask: DataTypes.INTEGER,
    dateOfAssignment: DataTypes.DATE,
    dateOfCompletion: DataTypes.DATE,
    dateOfNotification: DataTypes.DATE,
    dateOfDeadline: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  task_history.associate = function(models) {
    task_history.belongsTo(models.users, {
      foreignKey: 'idUser',
      as: 'users'
    });
    task_history.belongsTo(models.users, {
      foreignKey: 'idUser',
      as: 'idRequestor'
    });
    task_history.belongsTo(models.users, {
      foreignKey: 'idUser',
      as: 'idReporter'
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
