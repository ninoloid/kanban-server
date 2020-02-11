'use strict';
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model {
    static associate(models) {
      Task.belongsToMany(models.User, { through: models.UserTask })
      Task.hasOne(models.Category)
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category ID cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Category ID cannot be empty"
        }
      }
    }
  }, { sequelize });
  return Task;
};