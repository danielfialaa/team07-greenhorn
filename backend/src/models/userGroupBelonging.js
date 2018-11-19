'use strict';
module.exports = (sequelize, DataTypes) => {
  const userGroupBelonging = sequelize.define('userGroupBelonging', {}, {});

  return userGroupBelonging;

};
