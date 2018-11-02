'use strict';
module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  tasks.associate = function(models) {
    tasks.hasOne(departments {
      as: 'idDepartment'
    })
  };
  return tasks;
};
