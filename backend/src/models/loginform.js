module.exports = (sequelize, DataTypes) => {
  const LoginForm = sequelize.define('LoginForm', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  LoginForm.associate = function(models) {
    // associations can be defined here
  };
  return LoginForm;
};
