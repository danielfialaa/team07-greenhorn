'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    idUser: DataTypes.INTEGER,
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
    users.belongsTo(models.departments, {
      foreignKey: 'idDepartment'
    });

    users.hasMany(models.task_history, {
      foreignKey: 'idUser',
      as: 'users',
    });
    users.hasMany(models.task_history, {
      foreignKey: 'idUser',
      as: 'idRequestor',
    });
    users.hasMany(models.task_history, {
      foreignKey: 'idUser',
      as: 'idReporter',
    });


  };
  return users;
};
