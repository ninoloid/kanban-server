'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserTask extends sequelize.Sequelize.Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  UserTask.init({
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER
  }, { sequelize });
  return UserTask;
};