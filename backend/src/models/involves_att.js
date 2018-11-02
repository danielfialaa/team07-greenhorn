'use strict';
module.exports = (sequelize, DataTypes) => {
  const involves_att = sequelize.define('involves_att');
    involves_att.associate = function(models) {
      involves_att.hasOne(task {
        as: 'idTask'
      });
      involves_att.hasMany(attachement {
        as: 'idAttachment'
      });
    };
    return involves_att;
};
