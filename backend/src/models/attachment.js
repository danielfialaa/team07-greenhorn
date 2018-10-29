'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachment = sequelize.define('attachment', {
    path: DataTypes.STRING
  }, {});
  attachment.associate = function(models) {
    // associations can be defined here
  };
  return attachment;
};