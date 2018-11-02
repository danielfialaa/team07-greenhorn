'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    telephone: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.BLOB,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    users.hasOne(departments {
      as: 'idDepartment'
    })

  };
  return users;
};
