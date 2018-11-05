'use_strict';
module.exports = (sequelize, DataTypes) => {
  const departments = sequelize.define('departments', {
    departmentName: DataTypes.STRING
  });
  departments.associate = function(models) {
    departments.hasMany(models.users, {
        foreignKey: 'idDepartment',
        as: 'users'
      });
    departments.hasMany(models.tasks, {
      foreignKey: 'idDepartment',
      as: 'tasks'
    });
  };
  return departments;
};
