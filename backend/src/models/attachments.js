'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachments = sequelize.define('attachments', {
    path: DataTypes.STRING
  }, {});
  attachments.associate = function(models) {
      attachments.belongsTo(models.tasks, {
        foreignKey: 'idTask',
     });
      attachments.belongsTo(models.task_history, {
        foreignKey: 'idAssignedTask'
      })
  };
  return attachments;
};
