module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      dob: DataTypes.DATE,//DATETIME prý nefunguje se sequelize
      email: DataTypes.STRING,

    },
    {}
  );
  return User;
};
