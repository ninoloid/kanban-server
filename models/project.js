'use strict';
module.exports = (sequelize, DataTypes) => {
  class Project extends sequelize.Sequelize.Model {
    static associate(models) {
      Project.belongsToMany(models.User, { through: models.UserProject })
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