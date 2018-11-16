'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    groupName: DataTypes.STRING,
  }, {});

  groups.associate = function(models) {
    groups.belongsToMany(models.users, {
      through: 'userGroupBelonging'
    });

    groups.belongsToMany(models.tasks, {
      through: 'taskGroupBelonging'
    });

  };

  return groups;
};
