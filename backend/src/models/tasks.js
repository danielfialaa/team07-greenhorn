'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    idTask: DataTypes.INTEGER,
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
  };
  return tasks;
};
