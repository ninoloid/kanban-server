'use strict';
module.exports = (sequelize, DataTypes) => {
  class Project extends sequelize.Sequelize.Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Project name cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Project name cannot be empty"
        }
      }
    }
  }, { sequelize });
  return Project;
};