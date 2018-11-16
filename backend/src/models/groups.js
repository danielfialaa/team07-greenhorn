'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    groupName: DataTypes.STRING,
  }, {});

  groups.associate = function(models) {
    groups.belongsToMany(models.users, {
      through: 'groupBelonging'
    });
  };

  return groups;
};
