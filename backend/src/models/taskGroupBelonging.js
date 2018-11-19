'use strict';
module.exports = (sequelize, DataTypes) => {
  const taskGroupBelonging = sequelize.define('taskGroupBelonging', {}, {});

  return taskGroupBelonging;
};
