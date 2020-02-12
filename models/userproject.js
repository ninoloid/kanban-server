'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserProject extends sequelize.Sequelize.Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  UserProject.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, { sequelize });
  return UserProject;
};