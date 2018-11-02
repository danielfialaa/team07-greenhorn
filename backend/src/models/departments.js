'use_strict';
module.exports = (sequelize, DataTypes) => {
  const departments = sequelize.define('departments', {
    departmentName: DataTypes.STRING
  });
  departments.associate = function(models) {
    // associations can be defined here
    };
  return departments;
};
