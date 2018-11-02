'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachments = sequelize.define('attachments', {
    path: DataTypes.STRING
  }, {});
  attachment.associate = function(models) {
    // associations can be defined here
  };
  return attachments;
};
