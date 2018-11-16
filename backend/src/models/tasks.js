'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  tasks.associate = function(models) {
    tasks.belongsTo(models.departments, {
      foreignKey: 'idDepartment'
    });
    tasks.hasMany(models.task_history, {
      foreignKey: 'idTask',
      as: 'task_history'
    });
    tasks.belongsToMany(models.groups, {
      through: 'taskGroupBelonging'
    });
  };
  return tasks;
};
